import { LoginComponent } from './login.component';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MaterialModule } from '@shared/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { Constants } from '@core/constants';
import { UserService } from '@shared/user';
import { TranslateTestingModule } from 'test/mocks';
import { asyncData } from 'test/test.utils';
import { UserModel } from '@shared/user/user.model';
import { FormModule } from '@partials/form';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let fakeCreds = {} as any;

    beforeEach(async(() => {
        fakeCreds = { password: '123456789', username: 'ezzabuzaid' };
        const stubUserService = jasmine.createSpyObj<UserService>('PortalService', ['login']);

        TestBed.configureTestingModule({
            declarations: [
                LoginComponent,
                RegisterComponent
            ],
            imports: [
                BrowserAnimationsModule,
                MaterialModule,
                RouterTestingModule.withRoutes([]),
                FormModule,
                TranslateTestingModule
            ],
            providers: [
                { provide: UserService, useValue: stubUserService }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    describe('[ISOLATE]', () => {
        // it.todo("Verify if a user will be able to login with a valid username and valid password.")
        // it.todo("Verify if a user cannot login with a valid username and an invalid password.")
        // it.todo("Verify the login page for both, when the field is blank and Submit button is clicked.")
        // it.todo("Verify the ‘Forgot Password’ functionality.")
        // it.todo("Verify the messages for invalid login.");
        // it.todo("Verify the ‘Remember Me’ functionality.")
        // it.todo("Verify if a user is able to login with a new password only after he/she has changed the password.")
        // it.todo("Verify if the ‘Enter’ key of the keyboard is working correctly on the login page.")
        it('should have password and Username initial state as undefined with required as error', () => {
            expect(component.getControlValue('password')).toBeUndefined();
            expect(component.getControlValue('username')).toBeUndefined();
            expect(component.getControl('username').errors).toEqual({ required: true });
            expect(component.getControl('password').errors).toEqual({ required: true });
        });

        it('form should be valid when enter all requried field', (() => {
            component.form.setValue(fakeCreds);
            expect(component.form.valid).toBeTruthy();
        }));

        it('form should be invalid if username or password is missing', (() => {
            component.getControl('password').setValue(fakeCreds.password);
            expect(component.form.invalid).toBeTruthy();
            component.getControl('password').setValue(null);
            component.getControl('username').setValue(fakeCreds.username);
            expect(component.form.invalid).toBeTruthy();
        }));

    });
    function byQuerySelector<T = HTMLElement>(selector: string, parent = fixture.debugElement.nativeElement): T {
        return parent.querySelector(selector);
    }

    describe('[SHALLOW]', () => {

        function advance() {
            tick();
            fixture.detectChanges();
        }

        it('should create', () => {
            expect(component).toBeDefined();
        });

        it('should have a form widget associated with username and password inputs', () => {
            // TODO: Check if it has a form widget
            // TODO: Check if it has a forgot password button
            // TODO: Check if it has a register button
            // TODO: Check if it has a remember me checkbox
            expect(byQuerySelector(`#${component.getControl('username').id}`, byQuerySelector('form'))).toBeDefined();
            expect(byQuerySelector(`#${component.getControl('password').id}`, byQuerySelector('form'))).toBeDefined();
        });

        // TODO: move this test case to form widget component
        it('Should have the submit button as enabled after filling the form with valid values', () => {
            component.getControl('username').setValue(fakeCreds.username);
            component.getControl('password').setValue(fakeCreds.password);
            fixture.detectChanges();
            expect(byQuerySelector<HTMLButtonElement>('#submitButton').disabled).toBeFalsy();
        });

    });

    describe('[INTEGRATE]', () => {
        it('should call login method in portal service after submitting the form', fakeAsync(() => {
            const portalServiceSpy = TestBed.get(UserService) as UserService;
            component.getControl('username').setValue(fakeCreds.username);
            component.getControl('password').setValue(fakeCreds.password);
            fixture.detectChanges();
            byQuerySelector('#submitButton').click();
            expect(portalServiceSpy.login).toHaveBeenCalledTimes(1);
            expect(portalServiceSpy.login).toHaveBeenCalledWith(component.form.value);
        }));

        it('should redirect to app entry page after successed login', fakeAsync(() => {
            const navigateSpy = spyOn(TestBed.get(Router), 'navigateByUrl');
            const portalServiceSpy = TestBed.get(UserService);
            portalServiceSpy.login.and.returnValue(asyncData<Partial<UserModel.ILogin>>({ token: 'fakeJWTToken' }));
            component.getControl('username').setValue(fakeCreds.username);
            component.getControl('password').setValue(fakeCreds.password);
            fixture.detectChanges();
            byQuerySelector('#submitButton').click();
            tick();
            expect(navigateSpy).toHaveBeenCalledWith(Constants.Routing.Users.withSlash);
        }));
        // TODO: should verify that the localstorage has the token
    });
});
