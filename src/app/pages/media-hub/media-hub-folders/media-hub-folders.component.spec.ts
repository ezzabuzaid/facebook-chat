import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaHubFoldersComponent } from './media-hub-folders.component';

describe('MediaHubFoldersComponent', () => {
  let component: MediaHubFoldersComponent;
  let fixture: ComponentFixture<MediaHubFoldersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaHubFoldersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaHubFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
