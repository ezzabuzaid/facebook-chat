import { Component, OnInit } from '@angular/core';
import { CrudUtils } from '@widget/form';
import { ArticlesModel } from '../articles.model';
import { ArticleService } from '../article.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-articles-create',
  templateUrl: './articles-create.component.html',
  styleUrls: ['./articles-create.component.scss']
})
export class ArticleCreateComponent extends CrudUtils<ArticlesModel.POST> implements OnInit {
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {
    super(new ArticlesModel.POST());
    this.Form.valueChanges.subscribe(console.log);
  }

  ngOnInit() { }

  createArticle() {
    const { valid, value } = this.Form;
    if (valid) {
      this.articleService.create(value)
        .subscribe(
          data => {
            this.snackbar.open('Article created');
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error => {
            this.snackbar.open(error.message);
          });
    }
  }


}
