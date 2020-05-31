import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, Inject, InjectionToken, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ModelDialog } from './dialog.types';
export const GLOBAL_CONFIG_FOR_DIALOG = new InjectionToken<ModelDialog.DialogProperites>('GLOBAL_CONFIG_FOR_DIALOG');

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('dialogAnimation', [
      state('end', style({ opacity: 0, transform: 'translateY(100px)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100px)' }),
        animate('{{ fadeEnter }}ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition('default => end', [
        animate('{{ fadeLeave }}ms')
      ])
    ])]
})
export class DialogComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line: no-output-native
  @Output() close = new EventEmitter();
  @HostBinding('style.width') hostWidth;
  animation: ModelDialog.DialogAnimation = {
    value: 'default',
    params: {
      fadeEnter: this.config.fadeEnter,
      fadeLeave: this.config.fadeLeave
    }
  };
  options: ModelDialog.DialogProperites = {};
  constructor(
    @Inject(GLOBAL_CONFIG_FOR_DIALOG) public config
  ) { }

  ngOnInit() {
    this.hostWidth = this.options.width || this.config.width;
  }

  closeDialog() {
    // this.close.emit();
    this.animation = { value: 'end', params: { fadeEnter: this.config.fadeEnter, fadeLeave: this.config.fadeLeave } };
  }

  ngOnDestroy() {
  }

}
