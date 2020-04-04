import { ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef, Injectable, Type } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';

export interface IChatCard<T> {
    id: string;
    data: T;
}
type Component<T> = Type<IChatCard<T>>;
type ComponentReference<T> = ComponentRef<IChatCard<T>>;
class CardConfig<T> {
    withButton: boolean;
    id: string;
    data: T;
    constructor(config: Partial<CardConfig<T>>) {
        this.data = config.data ?? null;
        this.id = config.id || AppUtils.generateAlphabeticString();
        this.withButton = config.withButton ?? true;
    }
}
@Injectable()
export class ChatCardManager {

    public static count = 0;

    private buttonComponent: Component<any> = null;
    private buttons = new Map<string, ComponentRef<IChatCard<any>>>();
    private componentsRef = new Map<string, ComponentRef<IChatCard<any>>>();
    private components = new Map<string, Component<any>>();
    private currentOpenedCardID: string = null;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector,
    ) { }

    get currentCard() {
        return this.componentsRef.get(this.currentOpenedCardID);
    }

    private createComponent<T>(component: Component<T>, data: T, id: string) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(component);
        const componentRef = factory.create(this.injector);
        componentRef.instance.data = data;
        componentRef.instance.id = id;
        this.appRef.attachView(componentRef.hostView);
        const element = this.getElement(componentRef);
        document.body.appendChild(element);
        return {
            reference: componentRef,
            element
        }
    }

    private createCard<T>(component: Component<T>, data: T, id: string) {
        const { element, reference } = this.createComponent(component, data, id);
        element.style.setProperty('right', '7%');
        this.componentsRef.set(id, reference);
        this.components.set(id, component);
        this.currentOpenedCardID = id;
        this.adjustCaretCardPosition();
    }

    private createButton<T>(data: T, id: string) {
        const { element, reference } = this.createComponent(this.buttonComponent, data as any, id);
        this.buttons.set(id, reference);
        element.style.setProperty('bottom', `${this.buttons.size * 5 + 2}%`);
    }

    private close<T>(component: ComponentReference<T>) {
        this.appRef.detachView(component.hostView);
        component.destroy();
    }

    open<T>(component: Component<T>, config: Partial<CardConfig<T>>) {
        const cardConfig = new CardConfig(config);
        if (this.currentOpenedCardID !== cardConfig.id) {
            if (this.buttons.has(cardConfig.id)) {
                const buttonRef = this.buttons.get(cardConfig.id);
                this.buttons.delete(cardConfig.id);
                this.open(component, {
                    data: cardConfig.data,
                    id: cardConfig.id,
                    withButton: false
                });
                this.buttons.set(cardConfig.id, buttonRef);
            } else {
                if (this.currentCard) {
                    this.removeCard();
                }
                if (cardConfig.withButton) {
                    this.createButton(cardConfig.data, cardConfig.id);
                }
                this.createCard(component, cardConfig.data, cardConfig.id);
            }
        } else {
            this.adjustCaretCardPosition();
        }
        return this.componentsRef.get(cardConfig.id);
    }

    removeButton(id: string) {
        const component = this.buttons.get(id)
        this.close(component);
        this.buttons.delete(id);

        this.buttons.forEach((button) => {
            this.getElement(button).style.setProperty('bottom', `${this.buttons.size * 5 + 2}%`);
        });
    }

    removeCard() {
        this.close(this.currentCard);
        this.componentsRef.delete(this.currentOpenedCardID);
        this.currentOpenedCardID = null;
    }

    getElement(componentRef: ComponentRef<IChatCard<any>>) {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }

    getComponent(id: string) {
        return this.components.get(id);
    }

    toogleCard<T>(component: Component<T>, data: T, id: string) {
        if (AppUtils.isNullorUndefined(this.currentOpenedCardID)) {
            this.open(component, {
                data,
                id,
                withButton: false
            });
        } else if (id === this.currentOpenedCardID) {
            this.removeCard();
        } else {
            this.removeCard();
            this.open(component, {
                data,
                id,
                withButton: false
            });
        }
    }

    closeCurrentCard() {
        this.close(this.currentCard);
    }

    adjustCaretCardPosition() {
        const caret = this.getElement(this.currentCard).querySelector('.caret') as HTMLElement;
        caret.style.setProperty('bottom', `${this.buttons.size * 10 + 2}%`);
    }

    setButtonComponent(component: Component<any>) {
        this.buttonComponent = component;
    }

}
