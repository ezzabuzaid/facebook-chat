import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ElementRef, Inject, HostListener } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';
import { ChatManager } from '../chat.manager';
import { ChatMessage } from '../types';
import { ChatModel, MediaModel } from '@shared/models';
import { UploadService } from '@shared/services/upload';
import { MediaPickerComponent } from 'app/pages/media-hub/media-picker/media-picker.component';
import { MatDialog } from '@angular/material/dialog';
import * as EmojiButton from '@joeattardi/emoji-button';
import { WINDOW } from '@shared/common';
import { FormControl } from '@angular/forms';
import { MediaHubManager } from 'app/pages/media-hub/media-hub.manager';
@Component({
  selector: 'app-chat-card-footer',
  templateUrl: './chat-card-footer.component.html',
  styleUrls: ['./chat-card-footer.component.scss'],
})
export class ChatCardFooterComponent implements OnInit {
  @Input() room: ChatModel.IRoom;
  @Input() external = false;
  @Output() onSendMessage = new EventEmitter();
  @Output() onActionBarVisibilityChange = new EventEmitter(true);

  files: File[] = [];
  base64Files = [];
  showActionBar = false;
  emojiPicker = new EmojiButton();
  messageFormControl = new FormControl('');

  constructor(
    private chatManager: ChatManager,
    private uploadsService: UploadService,
    private elementRef: ElementRef<HTMLElement>,
    @Inject(WINDOW) private window: Window,
    private mediaHubManager: MediaHubManager
  ) { }

  ngOnInit() {
    const callback = emoji => {
      this.messageFormControl.setValue(
        this.messageFormControl.value + emoji
      )
    }
    this.emojiPicker.on('emoji', callback);
    this.messageFormControl.valueChanges
      .subscribe(value => {
        this.onActionBarVisibilityChange.emit(this.element);
      })
  }

  openEmojiPicker(event) {
    AppUtils.preventBubblingAndCapturing(event);
    this.emojiPicker.showPicker(this.element, {
      position: 'top',
      autoHide: false,
      showSearch: false,
      autoFocusSearch: false,
      showRecents: false,
      showPreview: false,
      categories: ['smileys'],
      theme: 'auto'
    });
  }


  @HostListener('click')
  closeEmojiPicker() {
    if (this.emojiPicker.pickerVisible) {
      this.emojiPicker.hidePicker();
    }
  }

  sendMessage() {
    const text = this.messageFormControl.value;
    if (AppUtils.isTruthy(text)) {
      this.messageFormControl.setValue('');
      if (this.external) {
        this.onSendMessage.emit(text);
      } else {
        const message = new ChatMessage(text, this.room._id);
        this.chatManager.sendMessage(message);

        this.files.forEach(file => {
          this.uploadsService.uploadImage(file, this.room.folder)
            .subscribe(({ path }) => {
              message.text = path;
              this.chatManager.sendMessage(message);
              this.base64Files.shift();
              this.files.shift();
            })
        });
      }
    }

  }

  openActionBar() {
    this.showActionBar = !this.showActionBar;
    setTimeout(() => {
      this.onActionBarVisibilityChange.emit(this.element);
    });
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
    this.mediaHubManager.openMediaPicker()
      .afterClosed()
      .subscribe((files) => {
        files.forEach(file => {
          const message = new ChatMessage(file.path, this.room._id);
          this.chatManager.sendMessage(message);
        });
      });
  }

  get element() {
    return this.elementRef.nativeElement;
  }

}
