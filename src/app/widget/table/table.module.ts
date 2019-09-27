import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFilterDirective } from './directive/filter.directive';
import { TableComponent } from './table-view/table-view.component';
import { FilterableDirective } from './directive/filterable.directive';
import { TableSortDirective } from './directive/sort.directive';
import { TableHeadComponent } from './table-actions/table-head.component';
import { TableActionsComponent } from './table-actions/table-actions.component';

@NgModule({
    declarations: [
        TableFilterDirective,
        FilterableDirective,
        TableComponent,
        TableActionsComponent,
        TableHeadComponent,
        TableSortDirective
    ],
    exports: [
        TableComponent,
        FilterableDirective,
        TableActionsComponent,
        TableHeadComponent
    ],
    providers: [],
    imports: [
        CommonModule,
    ]
})
export class SemiTableModule { }
