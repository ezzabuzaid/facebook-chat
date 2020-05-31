import { AfterContentInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss']
})
export class ChatCardComponent implements OnInit, AfterContentInit {

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>
  ) { }

  ngOnInit() { }

  ngAfterContentInit() {
    const header = this.getElement('[card-header]');
    const content = this.getElement('mat-card-content');
    content.style.setProperty('height', `calc(100% - ${header.clientHeight}px)`);
  }

  updateContentHeight() {
    const footer = this.getElement('app-chat-card-footer');
    const messagesWrapper = this.getElement('app-chat-card-messages');
    messagesWrapper.style.setProperty('height', `calc(100% - ${footer.clientHeight}px)`)
    messagesWrapper.scrollTo({
      top: messagesWrapper.scrollHeight,
      left: 0,
      behavior: 'smooth'
    })
  }

  private getElement(selector: string) {
    const element = this.elementRef.nativeElement;
    return element.querySelector(selector) as HTMLElement;
  }

}
