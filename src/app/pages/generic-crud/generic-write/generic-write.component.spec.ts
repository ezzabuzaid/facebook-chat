import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericWriteComponent } from './generic-write.component';

describe('GenericWriteComponent', () => {
  let component: GenericWriteComponent;
  let fixture: ComponentFixture<GenericWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
