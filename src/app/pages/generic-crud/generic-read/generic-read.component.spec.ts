import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericReadComponent } from './generic-read.component';

describe('GenericReadComponent', () => {
  let component: GenericReadComponent;
  let fixture: ComponentFixture<GenericReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
