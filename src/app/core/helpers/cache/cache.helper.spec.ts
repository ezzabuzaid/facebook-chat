import { HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AsyncCollection, AsyncDatabase } from '@ezzabuzaid/document-storage';
import { CacheDatabase, HttpCacheEntry, HttpCacheHelper } from './cache.helper';

xdescribe('HttpCacheService', () => {
  let service: HttpCacheHelper = null;
  let storage: AsyncDatabase = null;
  const COLLECTION_NAME = 'TEST';
  const ENTRY_NAME = 'endpoint';
  const mockCollection = jasmine.createSpyObj<AsyncCollection<any>>('AsyncCollection', ['clear', 'set', 'get', 'getAll']);


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CacheDatabase,
          useValue:
          {
            collection: jasmine.createSpy().and.returnValue(mockCollection)
          }
        }
      ]
    });
    service = TestBed.inject(HttpCacheHelper);
    storage = TestBed.inject(CacheDatabase);
    spyOn(service, 'removeOutdatedEntries');
  });

  afterEach(() => {
    mockCollection.set.calls.reset();
  });

  it('should create ...', () => {
    expect(service).toBeDefined();
  });

  it('[populate] should get the specifed cache collection', () => {
    service.populate(COLLECTION_NAME);

    expect(storage.collection).toHaveBeenCalledTimes(1);
    expect(storage.collection).toHaveBeenCalledWith(COLLECTION_NAME);
  });

  it('[set] should save the cache entry', () => {
    service.populate(COLLECTION_NAME);
    const entry = new HttpResponse();
    service.set(ENTRY_NAME, entry);

    expect(mockCollection.set).toHaveBeenCalledTimes(1);
    expect(mockCollection.set).toHaveBeenCalledWith(new HttpCacheEntry(ENTRY_NAME, entry));
  });

  it('[get] should get the entry from the cache', async () => {
    service.populate(COLLECTION_NAME);
    const valueToCache = new HttpResponse();
    const entry = new HttpCacheEntry(ENTRY_NAME, valueToCache);
    mockCollection.get.and.returnValue(Promise.resolve(entry));

    const cachedValue = await service.get(null);

    expect(cachedValue instanceof HttpResponse).toBeTruthy();
  });

  it('[clear] should clear out the cache collection', () => {
    service.populate(COLLECTION_NAME);
    service.clear();

    expect(mockCollection.clear).toHaveBeenCalledTimes(1);
  });

});


describe('HttpCacheEntry', () => {
  it('should stringify the value', () => {
    const entry = new HttpCacheEntry('', new HttpResponse());
    expect(entry.value).toEqual(JSON.parse(JSON.stringify(new HttpResponse())));
  });
});
