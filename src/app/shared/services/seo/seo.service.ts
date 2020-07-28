import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
    @Inject(DOCUMENT) private readonly document: Document,
  ) { }

  set title(value: string) {
    this.titleService.setTitle(value);
    this.metaService.updateTag({ name: 'application-name', content: value });
    this.metaService.updateTag({ name: 'apple-mobile-web-app-title', content: value });
  }

  get title() {
    return this.titleService.getTitle();
  }

  populate(meta: MetaTitles) {
    this.title = meta.title;
    this.metaService.updateTag({
      name: 'description',
      content: meta.description
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: meta.keywords,
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: meta.description
    });
    this.metaService.updateTag({
      property: 'og:title',
      content: meta.title
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: meta.url || this.document.location.href,
    });
    this.metaService.updateTag({
      property: 'og:image',
      content: meta.image,
    });
    this.metaService.updateTag({
      property: 'og:image:url',
      content: meta.image
    });
    this.metaService.updateTag({
      property: 'og:image:type',
      content: 'image/jpg',
    });
    this.metaService.updateTag({
      name: 'author',
      content: meta.author
    });
    this.metaService.updateTag({
      name: 'twitter:description',
      content: meta.description,
    });
    this.metaService.updateTag({
      name: 'twitter:title',
      content: meta.title,
    });
    this.metaService.updateTag({
      name: 'twitter:url',
      content: meta.url || this.document.location.href,
    });
    this.metaService.updateTag({
      name: 'twitter:image',
      content: meta.image,
      itemprop: 'image',
    });
  }

  clear(meta: (keyof MetaTitles)[]) {
    meta.forEach(tag => {
      this.metaService.removeTag(`name=${ tag }`);
    });
  }

}
interface MetaTitles {
  description: string;
  keywords: string;
  title: string;
  url?: string;
  image?: string;
  author?: string;
}
