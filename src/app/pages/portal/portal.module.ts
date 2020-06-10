import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldFactoryModule, FormFactoryModule } from '@ezzabuzaid/ngx-form-factory';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@shared/common';
import { PincodeBoxModule } from '@widget/pincode-box/pincode-box.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { PortalRoutingModule } from './portal-routing.module';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    MaterialModule,
    FormFactoryModule,
    FieldFactoryModule,
    ReactiveFormsModule,
    PincodeBoxModule,
    TranslateModule.forChild(),
  ]
})
export class PortalModule { }
