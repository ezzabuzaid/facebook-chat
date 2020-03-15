import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaHubGridViewComponent } from './media-hub-grid-view.component';

describe('MediaHubGridViewComponent', () => {
  let component: MediaHubGridViewComponent;
  let fixture: ComponentFixture<MediaHubGridViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaHubGridViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaHubGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
