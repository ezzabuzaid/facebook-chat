import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GmapComponent } from './components/gmap-view/gmap.component';
import { GmapAutocompleteComponent } from './components/gmap-autocomplete/gmap-autocomplete.component';
import { MaterialModule } from '@shared/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule.forChild()
  ],
  declarations: [
    GmapComponent,
    GmapAutocompleteComponent
  ],
  exports: [
    GmapComponent,
    GmapAutocompleteComponent
  ]
})
export class GmapModule { }
