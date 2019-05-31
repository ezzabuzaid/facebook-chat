import { Injectable, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, of } from 'rxjs';
import { ApplicationHelpers } from './helpers.service';
import { environment } from '@environments/environment';
import { Logger } from '../utils/logger/logger.service';
import { DOCUMENT } from '@angular/common';
import { LocalStorage } from './localstorage/localstorage.service';

const log = new Logger('LanguageService');

export enum Direction {
  LTR = 'ltr',
  RTL = 'rtl'
}

export enum Language {
  EN = 'en',
  AR = 'ar'
}

export interface LanguageChange {
  lang: Language;
  dir: Direction;
}


@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private directionSubject = new Subject<LanguageChange>();
  private supportedLanguage = environment.supportedLanguages;
  private defaultLanguage = environment.defaultLanguage as Language;
  constructor(
    private translateService: TranslateService,
    private localStorage: LocalStorage,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.translateService.addLangs(this.supportedLanguage);
  }

  populate(defaulLanguage: Language = this.defaultLanguage) {
    this.translateService.setDefaultLang(this.defaultLanguage);
    const languageToUsed = this.language || defaulLanguage || (this.translateService.getBrowserCultureLang().split('-')[0] as Language);
    return this.changeLanguage(languageToUsed);
  }

  /**
   *
   * @param language Language to use | eg. 'en' or 'ar'
   */
  changeLanguage(language: Language): LanguageChange {
    this.language = language;
    this.translateService.use(language);
    this.document.dir = this.direction;
    this.document.body.dir = this.direction;
    const returnValue = { dir: this.direction, lang: language };
    this.directionSubject.next(returnValue);
    return returnValue;
  }

  onChange(): Observable<LanguageChange> {
    return this.directionSubject.asObservable();
  }

  set language(language: Language) {
    this.localStorage.set(ApplicationHelpers.LANGUAGE_KEY, language);
  }

  get language() {
    return (this.localStorage.get(ApplicationHelpers.LANGUAGE_KEY) || this.defaultLanguage) as Language;
  }

  get direction(): Direction {
    return this.language === Language.EN ? Direction.LTR : Direction.RTL;
  }

  get isRtl() {
    return this.direction === Direction.RTL;
  }

}
