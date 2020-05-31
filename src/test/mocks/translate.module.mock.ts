import { Injectable, NgModule, Pipe, PipeTransform } from '@angular/core';
import { ELanguage } from '@core/helpers/language';
import { TranslateLoader, TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

// https://github.com/ngx-translate/example/blob/master/src/app/app.component.spec.ts

import * as TRANSLATIONS_AR from '../../assets/i18n/ar.json';
import * as TRANSLATIONS_EN from '../../assets/i18n/en.json';

export class FakeLoader implements TranslateLoader {
    getTranslation(lang: ELanguage): Observable<any> {
        return of(lang === ELanguage.AR ? TRANSLATIONS_AR : TRANSLATIONS_EN);
    }
}

@Pipe({
    name: 'translate'
})
export class TranslatePipeMock implements PipeTransform {
    public name = 'translate';

    public transform(query: string, ...args: any[]): any {
        return query;
    }
}

@Injectable()
export class TranslateServiceStub {
    public get<T>(key: T): Observable<T> {
        return of(key);
    }
}

@NgModule({
    declarations: [
        TranslatePipeMock
    ],
    providers: [
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: TranslatePipe, useClass: TranslatePipeMock },
    ],
    imports: [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: FakeLoader
            },
        })
    ],
    exports: [
        TranslatePipeMock,
        TranslateModule
    ]
})
export class TranslateTestingModule { }
