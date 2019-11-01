import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericCrudModel } from '../generic-crud.model';
import { TodosModel, UsersModel } from '@shared/models';
import { Module } from '@shared/models/generic-module';
import { delay, tap } from 'rxjs/operators';


@Component({
  selector: 'app-crud-manager',
  templateUrl: './crud-manager.component.html',
  styleUrls: ['./crud-manager.component.scss'],
})
export class CrudManagerComponent implements OnInit {
  public modules = [
    TodosModel.MODULE,
    UsersModel.MODULE,
  ];

  public currentModule: Module<any, any, any> = null;
  public EOperations = GenericCrudModel.EOperations;

  public operation = null;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // TODO: if the module is undefined redirect to 404 page
    this.route.params
      .pipe(
        tap(() => {
          this.currentModule = null;
        }),
        delay(100)
      )
      .subscribe(({ moduleName, operation }) => {
        console.log(this.modules, moduleName);
        this.operation = operation;
        this.currentModule = this.modules.find(module => module.name === moduleName);
      });
  }

}
