import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaHubGateComponent } from './media-hub-gate/media-hub-gate.component';


const routes: Routes = [
  { path: '', component: MediaHubGateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaHubRoutingModule { }
