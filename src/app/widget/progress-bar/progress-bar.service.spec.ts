import { TestBed } from '@angular/core/testing';
import { ProgressBarManager } from './progress-bar.manager';


describe('ProgressBarManager', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgressBarManager = TestBed.inject(ProgressBarManager);
    expect(service).toBeTruthy();
  });
});
