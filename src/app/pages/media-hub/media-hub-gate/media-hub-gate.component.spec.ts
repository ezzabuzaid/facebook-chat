import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaHubGateComponent } from './media-hub-gate.component';

describe('MediaHubGateComponent', () => {
  let component: MediaHubGateComponent;
  let fixture: ComponentFixture<MediaHubGateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaHubGateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaHubGateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
