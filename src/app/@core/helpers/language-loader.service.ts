import { Injectable, Injector } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from './language.service';

@Injectable()
export class LanguageLoader implements TranslateLoader {
    constructor(private injector: Injector) { }

    getTranslation() {
        const http = this.injector.get(HttpClient);
        const languageService = this.injector.get(LanguageService);
        console.log('test', languageService.language);
        return http.get(`assets/languages/${languageService.language}.json`);
    }
}
