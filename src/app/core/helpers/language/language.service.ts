import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Constants } from '@core/constants';
import { LocalStorage } from '@ezzabuzaid/document-storage';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';

export enum Direction {
  LTR = 'ltr',
  RTL = 'rtl'
}

export enum ELanguage {
  EN = 'en',
  AR = 'ar'
}

export class LanguageChange {
  constructor(
    public lang: ELanguage,
    public dir: Direction
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly directionChange = new Subject<LanguageChange>();
  private readonly supportedLanguage: ELanguage[] = [ELanguage.EN, ELanguage.AR];
  private readonly defaultLanguage: ELanguage = ELanguage.EN;

  constructor(
    private readonly translateService: TranslateService,
    private readonly localStorage: LocalStorage,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    this.translateService.addLangs(this.supportedLanguage);
  }

  populate(defaulLanguage: ELanguage = this.defaultLanguage) {
    this.translateService.setDefaultLang(this.defaultLanguage);
    const languageToUsed = this.language || defaulLanguage || (this.translateService.getBrowserCultureLang().split('-')[0] as ELanguage);
    return this.changeLanguage(languageToUsed);
  }

  /**
   *
   * @param language Language to use | eg. 'en' or 'ar'
   */
  changeLanguage(language: ELanguage): LanguageChange {
    this.language = language;
    this.translateService.use(language);
    this.document.dir = this.direction;
    this.document.body.dir = this.direction;
    const languageChange = new LanguageChange(language, this.direction);
    this.directionChange.next(languageChange);
    return languageChange;
  }

  onChange(): Observable<LanguageChange> {
    return this.directionChange.asObservable();
  }

  set language(language: ELanguage) {
    this.localStorage.set(Constants.Application.LANGUAGE_KEY, language);
  }

  get language() {
    return this.localStorage.get<ELanguage>(Constants.Application.LANGUAGE_KEY) || this.defaultLanguage;
  }

  get direction(): Direction {
    return this.language === ELanguage.EN ? Direction.LTR : Direction.RTL;
  }

  get isRtl() {
    return this.direction === Direction.RTL;
  }

}
