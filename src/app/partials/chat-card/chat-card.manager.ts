import { ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef, Injectable, Type } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';
import { UsersModel } from '@shared/models';
import { IChatCard } from './index';

@Injectable()
export class ChatCardManager {
    public static count = 0;
    private components = new Map<string, ComponentRef<IChatCard<any>>>();

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) { }

    open<T>(component: Type<IChatCard<T>>, data: T) {
        const id = AppUtils.generateAlphabeticString();
        const factory = this.componentFactoryResolver.resolveComponentFactory(component);
        const componentRef = factory.create(this.injector);
        const componentElement = this.getElement(componentRef);

        componentRef.instance.id = id;
        componentRef.instance.data = data;
        componentElement.style.setProperty('right', `calc(${300 * ChatCardManager.count}px + 15% + ${ChatCardManager.count++}%)`);

        this.appRef.attachView(componentRef.hostView);
        this.components.set(id, componentRef);
        document.body.appendChild(componentElement);
        return componentRef;
    }

    close(id: string) {
        const componentRef = this.components.get(id);
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
        ChatCardManager.count--;
        console.log(ChatCardManager.count);
        this.components.forEach((component) => {
            const componentElement = this.getElement(component);
            componentElement.style.setProperty('right', `calc(${300 * ChatCardManager.count}px + 15% + ${ChatCardManager.count}%)`);
        });
    }

    getElement(componentRef: ComponentRef<IChatCard<any>>) {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }

}
