import { TestBed, inject } from '@angular/core/testing';

import { AppGuard } from './app.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppGuard]
    });
  });

  it('should ...', inject([AppGuard], (guard: AppGuard) => {
    expect(guard).toBeTruthy();
  }));
});
