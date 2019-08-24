import { NgModule } from '@angular/core';
import { TableComponent } from './components/table.component';
import { CommonModule } from '@angular/common';
import { SemiTableModule } from 'semi-table';

@NgModule({
    declarations: [
        TableComponent,
    ],
    exports: [
        TableComponent,
        SemiTableModule
    ],
    providers: [],
    imports: [
        CommonModule,
        SemiTableModule
    ]
})
export class TableWidgetModule { }
