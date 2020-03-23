import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';
import { TokenService } from '@core/helpers/token';
import { ChatManager } from '../chat.manager';
import { ChatMessage } from '../types';
import { ChatModel, UsersModel } from '@shared/models';
import { UploadService } from '@shared/services/upload';

@Component({
  selector: 'app-chat-card-footer',
  templateUrl: './chat-card-footer.component.html',
  styleUrls: ['./chat-card-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatCardFooterComponent implements OnInit {
  @Input() conversation: ChatModel.IConversation;
  @Input() user: UsersModel.IUser;
  @Input() external = false;
  @Output() onSendMessage = new EventEmitter();
  @Output() onActionBarVisibilityChange = new EventEmitter();

  files: File[] = [];
  base64Files = [];
  showActionBar = false;
  showEmojiPicker = false;

  constructor(
    private tokenService: TokenService,
    private chatManager: ChatManager,
    private uploadsService: UploadService
  ) { }

  ngOnInit() { }

  sendMessage(input: HTMLTextAreaElement) {
    const text = input.value;
    if (AppUtils.isTruthy(text)) {
      input.value = '';
      if (this.external) {
        this.onSendMessage.emit(text);
      } else {
        const message = new ChatMessage(
          text,
          this.conversation._id,
          this.tokenService.decodedToken.id,
          this.user._id,
        );
        this.chatManager.sendMessage(message);

        this.files.forEach(file => {
          this.uploadsService.uploadImage(file, this.conversation.folder)
            .subscribe(({ path }) => {
              this.chatManager.sendMessage(new ChatMessage(
                path,
                message.conversation,
                message.sender_id,
                message.recipient_id
              ));
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
      this.onActionBarVisibilityChange.emit();
    });
  }

  openEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  uploadFiles(files: FileList) {
    this.files = Array.from(files);
    this.base64Files = this.files.map(file => AppUtils.readFile(file));

  }

  disposeFile(index: number) {
    this.base64Files.splice(index, 1);
  }

}
