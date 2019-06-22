import { SafePipe } from './safe-url.pipe';
import { TestBed } from '@angular/core/testing';

describe('SafePipe', () => {
  it('create an instance', () => {
    const pipe = TestBed.createComponent(SafePipe);
    expect(pipe).toBeTruthy();
  });
});
