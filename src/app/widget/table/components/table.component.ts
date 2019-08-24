import { Component } from '@angular/core';
import { SemiTableComponent } from 'semi-table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent extends SemiTableComponent { }
