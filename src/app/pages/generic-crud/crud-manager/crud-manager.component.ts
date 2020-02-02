import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericCrudModel } from '../generic-crud.model';
import { TodosModel, UsersModel } from '@shared/models';
import { IModule } from '@shared/models/generic-module';
import { delay, tap } from 'rxjs/operators';
import { AppUtils } from '@core/helpers/utils';
import { Constants } from '@core/constants';


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

  public currentModule: IModule<any, any, any> = null;
  public EOperations = GenericCrudModel.Operations;

  public operation = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log(this.modules);
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
        if (AppUtils.isFalsy(this.currentModule)) {
          // this.router.navigateByUrl(Constants.Routing.NOT_FOUND.withSlash);
        }
      });
  }

  ngOnInit() {
  }

}
