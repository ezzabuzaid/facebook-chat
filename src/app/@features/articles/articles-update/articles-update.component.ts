import { Component, OnInit } from '@angular/core';
import { CrudUtils } from '@widget/form';
import { ArticlesModel } from '../articles.model';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-articles-update',
  templateUrl: './articles-update.component.html',
  styleUrls: ['./articles-update.component.scss']
})
export class ArticleUpdateComponent extends CrudUtils<ArticlesModel.PUT> implements OnInit {
  constructor(
    private articleService: ArticleService,
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super(new ArticlesModel.PUT());
  }

  ngOnInit() {
    this.route.data.pipe(first())
      .subscribe(({ data }) => {
        this.Form.patchValue(data);
      });
  }


  updateArticle() {
    const { valid, value } = this.Form;
    value.id = +this.route.snapshot.paramMap.get('id');
    if (valid) {
      this.articleService.update(value)
        .subscribe(
          data => {
            this.snackbar.open('Article updated');
            this.router.navigate(['../../'], { relativeTo: this.route });
          },
          error => {
            this.snackbar.open(error.message);
          });
    }
  }

}
