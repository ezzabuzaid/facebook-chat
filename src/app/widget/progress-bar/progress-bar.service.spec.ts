import { TestBed } from '@angular/core/testing';
import { ProgressBarManager } from './progress-bar.manager';
import { getService } from 'test/test.utils';


describe('ProgressBarManager', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgressBarManager = getService(ProgressBarManager);
    expect(service).toBeTruthy();
  });
});
