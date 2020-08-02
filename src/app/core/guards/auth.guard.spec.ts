import { TestBed } from '@angular/core/testing';
import { AppUtils } from '@core/helpers/utils';
import { AppGuard } from './app.guard';
import { UrlSegment } from '@angular/router';
import { ApplicationUser } from '@core/application-user';
import { TokenHelper } from '@core/helpers/token';


describe('AppGuard', () => {
  let guardService: AppGuard = null;
  let applicationUser: ApplicationUser = null;
  let tokenHelper: TokenHelper = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppGuard]
    });
    guardService = TestBed.inject(AppGuard);
    applicationUser = TestBed.inject(ApplicationUser);
    tokenHelper = TestBed.inject(TokenHelper);
  });

  it('[canActivate] should check if the user is authenticated', () => {
    // Arrange
    const url = AppUtils.generateAlphabeticString();
    spyOn(guardService, 'authenticate');

    // Act
    guardService.canActivate(null, { url: url } as any);

    // Assert
    expect(guardService.authenticate).toHaveBeenCalledTimes(1);
    expect(guardService.authenticate).toHaveBeenCalledWith(url);
  });

  it('[canLoad] should check if the user is authenticated', () => {
    // Arrange
    spyOn(guardService, 'authenticate');
    const firstPath = AppUtils.generateAlphabeticString();
    const secondPath = AppUtils.generateAlphabeticString();

    // Act
    guardService.canLoad(null, [
      new UrlSegment(firstPath, {}),
      new UrlSegment(secondPath, {}),
    ]);

    // Assert
    expect(guardService.authenticate).toHaveBeenCalledWith('/' + firstPath + '/' + secondPath);
  });

  it('[canActivateChild] should check if the user is authenticated', () => {
    // Arrange
    const url = AppUtils.generateAlphabeticString();
    spyOn(guardService, 'authenticate');

    // Act
    guardService.canActivateChild(null, { url: url } as any);

    // Assert
    expect(guardService.authenticate).toHaveBeenCalledTimes(1);
    expect(guardService.authenticate).toHaveBeenCalledWith(url);
  });

  describe('[authenticate]', () => {
    it('should logout the user if he is not authenticated', () => {
      // Arrange
      spyOnProperty(tokenHelper, 'isAuthenticated', 'get').and.returnValue(false);
      spyOn(applicationUser, 'logout');

      // Act
      const canPass = guardService.authenticate();

      // Assert
      expect(canPass).toBeFalsy();
      expect(applicationUser.logout).toHaveBeenCalledTimes(1);
      expect(applicationUser.logout).toHaveBeenCalledWith(undefined);
    });

    it('should pass the user if he is authenticated', () => {
      // Arrange
      spyOnProperty(tokenHelper, 'isAuthenticated', 'get').and.returnValue(true);

      // Act
      const canPass = guardService.authenticate();

      // Assert
      expect(canPass).toBeTruthy();
    });
  });

});
