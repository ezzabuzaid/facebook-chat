import { ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef, Injectable, Type } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';
import { IChatCard } from './index';
import { ChatFloatingButtonComponent } from './chat-floating-button/chat-floating-button.component';

type Component<T> = Type<IChatCard<T>>;
type ComponentReference<T> = ComponentRef<IChatCard<T>>;

@Injectable()
export class ChatCardManager {

    public static count = 0;

    private buttons = new Map<string, ComponentRef<IChatCard<any>>>();
    private components = new Map<string, ComponentRef<IChatCard<any>>>();
    private currentOpenedCardID: string = null;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector,
    ) { }

    get currentCard() {
        return this.components.get(this.currentOpenedCardID);
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
        this.components.set(id, reference);
        this.currentOpenedCardID = id;
        this.adjustCaretCardPosition();
    }

    private createButton<T>(data: T, id: string) {
        const { element, reference } = this.createComponent(ChatFloatingButtonComponent, data as any, id);
        this.buttons.set(id, reference);
        element.style.setProperty('bottom', `${this.buttons.size * 5 + 2}%`);
    }

    private close<T>(component: ComponentReference<T>) {
        this.appRef.detachView(component.hostView);
        component.destroy();
    }

    open<T>(component: Component<T>, data: T, id = AppUtils.generateAlphabeticString(), withButton = true) {
        if (this.currentOpenedCardID !== id) {
            if (this.buttons.has(id)) {
                const buttonRef = this.buttons.get(id);
                this.buttons.delete(id);
                this.open(component, data, id, false);
                this.buttons.set(id, buttonRef);
            } else {
                if (this.currentCard) {
                    this.removeCard();
                }
                if (withButton) {
                    this.createButton(data, id);
                }
                return this.createCard(component, data, id);
            }
        } else {
            this.adjustCaretCardPosition();
            return this.components.get(id);
        }
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
        this.components.delete(this.currentOpenedCardID);
        this.currentOpenedCardID = null;
    }

    getElement(componentRef: ComponentRef<IChatCard<any>>) {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }

    toogleCard<T>(component: Component<T>, data: T, id: string) {
        if (AppUtils.isNullorUndefined(this.currentOpenedCardID)) {
            this.open(component, data, id, false);
        } else if (id === this.currentOpenedCardID) {
            this.removeCard();
        } else {
            this.removeCard();
            this.open(component, data, id, false);
        }
    }

    closeCurrentCard() {
        this.close(this.currentCard);
    }

    adjustCaretCardPosition() {
        const caret = this.getElement(this.currentCard).querySelector('.caret') as HTMLElement;
        caret.style.setProperty('bottom', `${this.buttons.size * 10 + 2}%`);
    }

}
