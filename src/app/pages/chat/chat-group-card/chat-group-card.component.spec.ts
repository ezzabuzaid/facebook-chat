import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupCharCardComponent } from './chat-group-card.component';


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
