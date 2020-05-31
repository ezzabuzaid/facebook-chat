import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableFilterDirective } from './directive/filter.directive';
import { FilterableDirective } from './directive/filterable.directive';
import { TableSortDirective } from './directive/sort.directive';
import { TableActionComponent } from './table-actions/table-actions.component';
import { TableHeadComponent } from './table-actions/table-head.component';
import { TableComponent } from './table-view/table-view.component';

@NgModule({
    declarations: [
        TableFilterDirective,
        FilterableDirective,
        TableComponent,
        TableActionComponent,
        TableHeadComponent,
        TableSortDirective
    ],
    exports: [
        TableComponent,
        FilterableDirective,
        TableActionComponent,
        TableHeadComponent
    ],
    providers: [],
    imports: [
        CommonModule,
    ]
})
export class TableModule { }
