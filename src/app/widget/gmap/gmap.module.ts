import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@shared/common';
import { GmapAutocompleteComponent } from './components/gmap-autocomplete/gmap-autocomplete.component';
import { GmapComponent } from './components/gmap-view/gmap.component';

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
