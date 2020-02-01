import { TestBed } from '@angular/core/testing';
import { ProgressBarManager } from './progress-bar.manager';


describe('ProgressBarManager', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgressBarManager = TestBed.get(ProgressBarManager);
    expect(service).toBeTruthy();
  });
});
