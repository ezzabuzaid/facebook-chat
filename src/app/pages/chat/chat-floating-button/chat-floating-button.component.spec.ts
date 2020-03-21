import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFloatingButtonComponent } from './chat-floating-button.component';

describe('ChatFloatingButtonComponent', () => {
  let component: ChatFloatingButtonComponent;
  let fixture: ComponentFixture<ChatFloatingButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatFloatingButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFloatingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
