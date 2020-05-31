
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SetupInterceptor } from '../setup.interceptor';
import { HttpCacheHelper } from './../../helpers/cache';
import { CacheInterceptor } from './cache.interceptor';


xdescribe(`CacheInterceptor`, () => {
    const HttpCacheHelperSpy = jasmine.createSpyObj<HttpCacheHelper>('HttpCacheHelper', ['populate', 'get'])
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, HttpClientTestingModule],
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: SetupInterceptor,
                    multi: true
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: CacheInterceptor,
                    multi: true
                },
                {
                    provide: HttpCacheHelper,
                    useValue: HttpCacheHelperSpy
                }
            ]
        });
    });

    it('should pass off if the request method is not get', () => {
        const httpClient = TestBed.inject(HttpClient);
        const cacheHelper = TestBed.inject(HttpCacheHelper)

        httpClient.delete('http://test.com/api/users').subscribe();

        expect(cacheHelper.populate).not.toHaveBeenCalled();
    });

    it('should pass off if the request is not cachable', () => {
        const httpClient = TestBed.inject(HttpClient);
        const cacheHelper = TestBed.inject(HttpCacheHelper)

        httpClient
            .configure({ LOCAL_CACHE: false })
            .delete('http://test.com/api/users')
            .subscribe();

        expect(cacheHelper.populate).not.toHaveBeenCalled();
    });

    // fit('should get the cache category from headers', fakeAsync(() => {
    //     const httpClient = TestBed.inject(HttpClient);
    //     const cacheHelper = TestBed.inject(HttpCacheHelper)
    //     const CACHE_CATEGORY = 'test'
    //     httpClient
    //         .configure({
    //             LOCAL_CACHE: true,
    //             CACHE_CATEGORY
    //         })
    //         .get('http://test.com/api/users')
    //         .subscribe();
    //     flush();

    //     expect(cacheHelper.populate).toHaveBeenCalledWith(CACHE_CATEGORY);
    //     expect(cacheHelper.populate).toHaveBeenCalledTimes(1);
    // }));

});