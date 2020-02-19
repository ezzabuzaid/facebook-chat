import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupChatCreateComponent } from './group-chat-create.component';

describe('GroupChatCreateComponent', () => {
  let component: GroupChatCreateComponent;
  let fixture: ComponentFixture<GroupChatCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupChatCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupChatCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
