import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { MaterialModule } from '@shared/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PortalService } from './portal.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ],
  providers: [
    PortalService
  ]
})
export class PortalModule { }
