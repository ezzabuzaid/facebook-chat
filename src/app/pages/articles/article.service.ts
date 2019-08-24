import { Injectable } from '@angular/core';
import { FormValue } from 'app/widget/form';
import { tryOrThrow } from '@core/helpers/utils';
import { ArticlesModel } from './articles.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ArticleService {
    constructor() { }

    create(payload: FormValue<ArticlesModel.POST>) { }

    update(payload: FormValue<ArticlesModel.POST>) { }

    get(id: number) { }

    list() { }

    delete(id: number) { }

}
