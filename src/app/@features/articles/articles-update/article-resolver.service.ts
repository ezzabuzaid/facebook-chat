import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleService } from '../article.service';
import { MatSnackBar } from '@angular/material';
import { tap } from 'rxjs/operators';

@Injectable()
export class ArticlesResolve implements Resolve<any> {

    constructor(
        private articleService: ArticleService,
        private snackbar: MatSnackBar,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return this.articleService.get(+route.paramMap.get('id'))
            .pipe(tap(() => { }, (error) => {
                this.snackbar.open(error.message);
                this.router.navigate(['../'], { relativeTo: this.route });
            }));
    }
}
