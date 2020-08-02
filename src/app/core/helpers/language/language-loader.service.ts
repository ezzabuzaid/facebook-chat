import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { LanguageService } from './language.service';
import { environment } from '@environments/environment';

@Injectable()
export class LanguageLoader implements TranslateLoader {

    constructor(
        private readonly injector: Injector
    ) { }

    getTranslation() {
        const http = this.injector.get(HttpClient);
        const languageService = this.injector.get(LanguageService);
        return http
            .configure({
                DEFAULT_URL: false,
                LOCAL_CACHE: environment.production,
                CACHE_CATEGORY: 'language'
            })
            .get(`assets/i18n/${ languageService.language }.json`);
    }
}
