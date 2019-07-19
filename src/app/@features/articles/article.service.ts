import { Injectable } from '@angular/core';
import { FormValue } from '@widget/form';
import { tryOrThrow } from '@core/helpers';
import { ArticlesController } from './articles.controller';
import { ArticlesModel } from './articles.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ArticleService {
    constructor(
        private articlesController: ArticlesController<FormValue<ArticlesModel.POST>>
    ) { }

    create(payload: FormValue<ArticlesModel.POST>) {
        return tryOrThrow(() => this.articlesController.create(payload));
    }

    update(payload: FormValue<ArticlesModel.POST>) {
        return tryOrThrow(() => this.articlesController.update(payload));
    }

    get(id: number) {
        return tryOrThrow(() => this.articlesController.get(id));
    }

    list() {
        return tryOrThrow(() => this.articlesController.getAll())
            .pipe(map(list => list.length ? list : null));
    }

    delete(id: number) {
        return tryOrThrow(() => this.articlesController.delete(id));
    }

}
