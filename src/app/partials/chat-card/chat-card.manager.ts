import { ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef, Injectable } from '@angular/core';
import { ChatCardComponent } from './chat-card.component';
import { AppUtils } from '@core/helpers/utils';
import { UsersModel } from '@shared/models';

@Injectable()
export class ChatCardManager {
    public static count = 0;
    components = new Map<string, ComponentRef<ChatCardComponent>>();

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) { }

    createComponent(user: UsersModel.IUser) {
        const id = AppUtils.generateAlphabeticString();
        const factory = this.componentFactoryResolver.resolveComponentFactory(ChatCardComponent);
        const componentRef = factory.create(this.injector);
        const componentElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        componentRef.instance.id = id;
        componentRef.instance.user = user;
        componentElement.style.setProperty('right', `calc(${300 * ChatCardManager.count}px + 15% + ${ChatCardManager.count}%)`);
        ChatCardManager.count++;

        this.appRef.attachView(componentRef.hostView);
        this.components.set(id, componentRef);
        document.body.appendChild(componentElement);
        return componentRef;
    }

    close(id: string) {
        const componentRef = this.components.get(id);
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }

}


// <!-- calc(300px + 15% + 2%); -->
