import { Component, OnInit, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';
import { ChatManager } from '../chat.manager';
import { ChatModel } from '@shared/models';
import * as EmojiButton from '@joeattardi/emoji-button';
import { FormControl } from '@angular/forms';
import { MediaHubManager } from 'app/pages/media-hub/media-hub.manager';
import { TokenHelper } from '@core/helpers/token';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-chat-card-footer',
  templateUrl: './chat-card-footer.component.html',
  styleUrls: ['./chat-card-footer.component.scss'],
})
export class ChatCardFooterComponent implements OnInit {
  @Input() room: ChatModel.IRoom;
  @Input() external = false;
  @Output() onSendMessage = new EventEmitter();
  @Output() onActionBarVisibilityChange = new EventEmitter<HTMLElement>(true);

  files: File[] = [];
  base64Files = [];
  showActionBar = false;
  emojiPicker = new EmojiButton({
    position: 'top',
    autoHide: false,
    showSearch: false,
    autoFocusSearch: false,
    showRecents: false,
    showPreview: false,
    categories: ['smileys'],
    theme: 'auto'
  });
  messageFormControl = new FormControl('');

  constructor(
    private chatManager: ChatManager,
    private elementRef: ElementRef<HTMLElement>,
    private mediaHubManager: MediaHubManager,
    private tokenService: TokenHelper
  ) { }

  ngOnInit() {
    this.emojiPicker.on('emoji', emoji => {
      this.messageFormControl.setValue(this.messageFormControl.value + emoji)
    });
    this.messageFormControl.valueChanges
      .subscribe(value => {
        this.onActionBarVisibilityChange.emit(this.element);
      })
  }

  openEmojiPicker(event) {
    AppUtils.preventBubblingAndCapturing(event);
    this.emojiPicker.showPicker(this.element);
  }

  @HostListener('click')
  closeEmojiPicker() {
    if (this.emojiPicker.pickerVisible) {
      this.emojiPicker.hidePicker();
    }
  }

  sendMessage() {
    const text = this.messageFormControl.value as string;
    if (AppUtils.isTruthy(text)) {
      this.messageFormControl.setValue('');
      if (this.external) {
        this.onSendMessage.emit(text);
      } else {
        this.chatManager.sendLocalMessage(this.createMessage(text));
      }
    }
    if (AppUtils.hasItemWithin(this.files)) {
      for (const file of this.files) {
        this.chatManager.sendLocalMessage(this.createMessage(null, file));
      }
      this.hideActionBar();
    }
  }

  createMessage(text: string, file: File = null) {
    return new ChatModel.Message({
      text,
      rawFile: file,
      user: this.tokenService.decodedToken.id,
      room: this.room._id,
    })
  }

  openActionBar() {
    this.showActionBar = !this.showActionBar;
    if (!this.showActionBar) {
      this.files = [];
      this.base64Files = [];
    }
  }

  uploadFiles(files: FileList) {
    this.files = Array.from(files);
    this.base64Files = this.files.map(file => AppUtils.readFile(file));
  }

  disposeFile(index: number) {
    this.base64Files.splice(index, 1);
    this.files.splice(index, 1);
    if (AppUtils.isEmpty(this.base64Files)) {
      this.showActionBar = false;
    }
  }

  openMediaPicker() {
    this.mediaHubManager.openMediaPicker(this.room._id)
      .afterClosed()
      .pipe(filter(AppUtils.hasItemWithin))
      .subscribe((files) => {
        files.forEach(file => {
          this.chatManager.sendLocalMessage(this.createMessage(file.path));
        });
      });
  }

  get element() {
    return this.elementRef.nativeElement;

  }

  isImage(type: string) {
    return AppUtils.isImage(type);
  }

  hideActionBar() {
    this.showActionBar = false;
    this.files = [];
    this.base64Files = [];
  }

}
