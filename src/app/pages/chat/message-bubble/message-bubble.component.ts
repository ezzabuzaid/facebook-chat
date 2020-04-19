import { Component, OnInit, Input, ChangeDetectionStrategy, HostBinding, ElementRef } from '@angular/core';
import { ChatManager } from '../chat.manager';
import { TokenService } from '@core/helpers/token';
import { ChatModel, MediaModel } from '@shared/models';
import { AppUtils } from '@core/helpers/utils';

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
  @HostBinding('class.sender') isSender: boolean = false;
  file: MediaModel.File = null;
  constructor(
    private chatManager: ChatManager,
    private tokenService: TokenService,
    private elementRef: ElementRef<HTMLElement>
  ) { }

  ngOnInit() {
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

    if (this.message.timestamp) {
      this.loading = true;
      const listener = this.chatManager.socket
        .on(`saved_${this.message.timestamp}`, (id) => {
          this.loading = false;
          this.message._id = id;
          listener.removeAllListeners();
        })
    }
    this.isSender = this.tokenService.decodedToken.id === this.message.user;
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
