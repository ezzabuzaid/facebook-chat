import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesListComponent implements OnInit {
  $dataSource = this.articleService.list();

  constructor(
    private cdf: ChangeDetectorRef,
    private articleService: ArticleService,
  ) { }

  ngOnInit() {
  }

  trackByFunction(item, index) {
    return item.id;
  }

  removeArticle(id) { }

}
