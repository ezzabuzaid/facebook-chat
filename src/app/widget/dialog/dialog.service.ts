import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Inject,
  Injectable,
  Injector,
  Renderer2,
  RendererFactory2,
  Type
} from '@angular/core';
import { Backdrop } from './backdrop.utils';
import { DialogComponent, GLOBAL_CONFIG_FOR_DIALOG } from './dialog.component';
import { ModelDialog } from './dialog.types';
@Injectable()
export class DialogService {
  /**
   * Please note that this Dialog widget doesn't designed to support multiple dialog at one time
   */
  // TODO
  // create a sperate class for dialog creator and dialog reference
  private dialogComponentRef: ComponentRef<DialogComponent> = null;
  private contnetComponentRef: ComponentRef<{}> = null;
  private readonly renderer: Renderer2 = null;
  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly appRef: ApplicationRef,
    private readonly injector: Injector,
    private readonly backdrop: Backdrop,
    private readonly rendererFactory2: RendererFactory2,
    @Inject(GLOBAL_CONFIG_FOR_DIALOG) private readonly config
  ) {
    this.renderer = this.rendererFactory2.createRenderer(null, null);
  }
  /**
   *
   * @param component Dialog Component
   * @param dialogProperites DialogProperites
   */

  open(component: Type<{}>, dialogProperites: ModelDialog.DialogProperites = {}) {
    const dialogRef = this.initComponent(DialogComponent);
    const contentRef = this.initComponent(component);

    this.bindOptionToDialog(this.contnetComponentRef.instance, dialogProperites);
    dialogRef.instance.options = dialogProperites;



    // const parentDialogRef = new Dialog();
    // parentDialogRef.instance['options'] = dialogProperites;



    const dialogContent = this.appendToApp(this.dialogComponentRef.hostView);
    const componentContent = this.appendToApp(this.contnetComponentRef.hostView);

    componentContent.className = dialogProperites.class || '';

    this.bindToDom(dialogContent)
      .querySelector('#content')
      .insertAdjacentElement('afterbegin', componentContent);

    this.backdrop.addBackdrop();
    this.configDialogWrapper();

    this.renderer.listen(Backdrop.element, 'click', this.close.bind(this));

    this.dialogComponentRef.onDestroy(() => {
      this.configDialogWrapper();
      this.backdrop.removeBackdrop();
    });
    this.dialogComponentRef = dialogRef;
    this.contnetComponentRef = contentRef;
    return this.contnetComponentRef;
  }

  close() {
    this.dialogComponentRef.instance.closeDialog();
    setTimeout(() => {
      this.appRef.detachView(this.contnetComponentRef.hostView);
      this.appRef.detachView(this.dialogComponentRef.hostView);

      this.contnetComponentRef.destroy();
      this.dialogComponentRef.destroy();

      this.dialogComponentRef = null;
      this.contnetComponentRef = null;
    }, this.config.fadeLeave);
  }

  private bindOptionToDialog(componentInstance, options) {
    Object.assign(componentInstance, options);
  }

  private bindToDom(content: HTMLElement) {
    document.body.appendChild(content);
    return content;
  }

  private initComponent<T>(component: Type<T>) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    return factory.create(this.injector);
  }

  private appendToApp(hostView) {
    /**
     * attachView the dialog component and it's content to the application ref to run change detection on them
     */
    const view = (hostView as EmbeddedViewRef<any>);
    this.appRef.attachView(view);
    return view.rootNodes[0] as HTMLElement;
  }

  private configDialogWrapper() {
    const body = document.body;
    if (body.classList.contains('dialog-opened')) {
      this.renderer.removeClass(body, 'dialog-opened');
    } else {
      this.renderer.addClass(body, 'dialog-opened');
    }
  }

}


// class Dialog {

//   private initComponent(component: Type<{}>) {
//     const factory = this.componentFactoryResolver.resolveComponentFactory(component);
//     return factory.create(this.injector);
//   }

// }
