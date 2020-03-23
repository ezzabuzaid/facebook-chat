import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCardMessagesComponent } from './chat-card-messages.component';

describe('ChatCardMessagesComponent', () => {
  let component: ChatCardMessagesComponent;
  let fixture: ComponentFixture<ChatCardMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatCardMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCardMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
