import { Component, OnInit, Renderer2, ElementRef, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss']
})
export class ChatCardComponent implements OnInit, AfterContentInit {

  constructor(
    private elementRef: ElementRef<HTMLElement>
  ) { }

  ngOnInit() { }

  ngAfterContentInit() {
    const header = this.getElement('[card-header]');
    const content = this.getElement('mat-card-content');
    content.style.setProperty('height', `calc(100% - ${header.clientHeight}px)`)
  }

  private getElement(selector: string) {
    const element = this.elementRef.nativeElement;
    return element.querySelector(selector) as HTMLElement;
  }

}
