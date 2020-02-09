import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupCharCardComponent } from './group-chat-card.component';


describe('GroupCharCardComponent', () => {
  let component: GroupCharCardComponent;
  let fixture: ComponentFixture<GroupCharCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupCharCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCharCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
