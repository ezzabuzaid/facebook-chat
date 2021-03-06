import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatConversationCardComponent } from './chat-conversation-card.component';


describe('ChatConversationCardComponent', () => {
  let component: ChatConversationCardComponent;
  let fixture: ComponentFixture<ChatConversationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatConversationCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatConversationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
