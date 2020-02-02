import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { getService } from 'test/test.utils';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserService = getService(UserService);
    expect(service).toBeTruthy();
  });
});
