import { TestBed } from '@angular/core/testing';

import { AppGuard } from './app.guard';
import { UserService } from '@shared/account';

describe('AuthGuard', () => {
  let guardService: AppGuard = null;
  let userService: UserService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppGuard]
    });
    guardService = TestBed.inject(AppGuard);
    userService = TestBed.inject(UserService);
  });

  it('[canActivate] should check if the user is authenticated', () => {
    spyOn(guardService, 'authenticate');

    guardService.canActivate(null, null);

    expect(guardService.authenticate).toHaveBeenCalledTimes(1);
  });

  it('[canLoad] should check if the user is authenticated', () => {
    spyOn(guardService, 'authenticate');

    guardService.canActivate(null, null);

    expect(guardService.authenticate).toHaveBeenCalledTimes(1);
  });

  it('[canActivateChild] should check if the user is authenticated', () => {
    spyOn(guardService, 'authenticate');

    guardService.canActivate(null, null);

    expect(guardService.authenticate).toHaveBeenCalledTimes(1);
  });

  describe('[authenticate]', () => {
    it('should logout the user if he is not authenticated', () => {
      spyOnProperty(userService, 'isAuthenticated', 'get').and.returnValue(false);
      spyOn(userService, 'logout');

      const shouldPass = guardService.authenticate();

      expect(shouldPass).toBeFalsy();
      expect(userService.logout).toHaveBeenCalledTimes(1);
    });
    it('should pass the user if he is authenticated', () => {
      spyOnProperty(userService, 'isAuthenticated', 'get').and.returnValue(true);

      const shouldPass = guardService.authenticate();

      expect(shouldPass).toBeTruthy();
    });
  });

});
