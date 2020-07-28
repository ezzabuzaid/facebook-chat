import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { TokenHelper } from '@core/helpers/token';
import { AppUtils } from '@core/helpers/utils';
import { ChatModel, MediaModel } from '@shared/models';
import { ChatManager } from '../chat.manager';

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'mb-2 mx-3 position-relative'
  }
})
export class MessageBubbleComponent implements OnInit {
  @Input() message: ChatModel.Message;
  public loading = false;
  @HostBinding('class.sender') isSender = false;
  file: MediaModel.File = null;
  constructor(
    private readonly chatManager: ChatManager,
    private readonly tokenService: TokenHelper,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly cdf: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.message.timestamp) {
      this.loading = true;
      const listener = this.chatManager.socket
        .on(`saved_${ this.message.timestamp }`, (id) => {
          this.loading = false;
          this.message._id = id;
          listener.removeAllListeners();
        });
      this.cdf.markForCheck();
    }
    this.isSender = this.tokenService.decodedToken.id === this.message.user;
    this.cdf.markForCheck();

    if (this.message.rawFile) {
      this.file = new MediaModel.File({
        path: null,
        type: this.message.rawFile.type,
        rawFile: this.message.rawFile,
        size: this.message.rawFile.size,
        name: this.message.rawFile.name,
        folder: this.message.room,
      });
    } else if (this.isFile()) {
      const searchParam = new URLSearchParams(this.message.text.split('?')[1]);
      this.file = new MediaModel.File({
        rawFile: null,
        type: searchParam.get('type'),
        size: +searchParam.get('size'),
        name: searchParam.get('name'),
        path: this.message.text,
        folder: this.message.room,
      });
    }
  }

  sendMessage(text: string) {
    this.message.text = text;
    this.chatManager.sendMessage(this.message);
  }

  isFile() {
    return AppUtils.isTruthy(this.message.rawFile) || AppUtils.isFile(this.message.text.split('?')[0]);
  }

  get element() {
    return this.elementRef.nativeElement;
  }

}
