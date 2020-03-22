import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCardFooterComponent } from './chat-card-footer.component';

describe('ChatCardFooterComponent', () => {
  let component: ChatCardFooterComponent;
  let fixture: ComponentFixture<ChatCardFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatCardFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
