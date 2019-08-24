import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFilterDirective } from './directive/filter.directive';
import { TableComponent } from './components/table-view/table-view.component';
import { FilterableDirective } from './directive/filterable.directive';
import { TableHeadComponent } from './components/table-actions/table-head.component';
import { TableActionsComponent } from './components/table-actions/table-actions.component';
import { TableSortDirective } from './directive/sort.directive';

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
