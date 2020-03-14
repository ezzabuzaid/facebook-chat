import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaHubListViewComponent } from './media-hub-list-view.component';

describe('MediaHubListViewComponent', () => {
  let component: MediaHubListViewComponent;
  let fixture: ComponentFixture<MediaHubListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaHubListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaHubListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
