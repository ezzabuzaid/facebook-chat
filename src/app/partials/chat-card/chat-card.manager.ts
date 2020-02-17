import { ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef, Injectable } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';
import { UsersModel } from '@shared/models';
import { UserCardComponent } from './user-card/user-card.component';

@Injectable()
export class ChatCardManager {
    public static count = 0;
    components = new Map<string, ComponentRef<UserCardComponent>>();

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) { }

    open(user: UsersModel.IUser) {
        const id = AppUtils.generateAlphabeticString();
        const factory = this.componentFactoryResolver.resolveComponentFactory(UserCardComponent);
        const componentRef = factory.create(this.injector);
        const componentElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        componentRef.instance.id = id;
        componentRef.instance.user = user;
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
    }

}
