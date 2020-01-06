import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InifiniteScrollFetchingComponent } from './inifinite-scroll-fetching.component';

describe('InifiniteScrollFetchingComponent', () => {
  let component: InifiniteScrollFetchingComponent;
  let fixture: ComponentFixture<InifiniteScrollFetchingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InifiniteScrollFetchingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InifiniteScrollFetchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
