import { TestBed } from '@angular/core/testing';

describe('ApplicationUser', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationUser = TestBed.inject(ApplicationUser);
    expect(service).toBeTruthy();
  });
});
