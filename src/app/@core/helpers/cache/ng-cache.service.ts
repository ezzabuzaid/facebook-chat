import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { Logger } from '../logger/logger.service';
const log = new Logger('CacheService');
const cachePersistenceKey = 'httpCache';

export interface HttpCacheEntry {
  lastUpdated: Date;
  data: HttpResponse<any>;
}

/**
 * Provides a cache facility for HTTP requests with configurable persistence policy.
 */
@Injectable({
  providedIn: 'root'
})
export class NgCacheService {

  // private cachedData: Map<string, HttpCacheEntry> = new Map();
  private storage = localStorage;

  constructor() { }

  private set(url, value) {
    this.storage.setItem(url, JSON.stringify(value));
  }

  private get(url) {
    return JSON.parse(this.storage.getItem(url));
  }

  setData(url: string, data: HttpResponse<any>, lastUpdated?: Date) {
    const cacheEntry = {
      lastUpdated: lastUpdated || new Date(),
      data
    };
    log.debug(`Cache set for key: "${url}"`);
    this.set(url, cacheEntry);
  }

  getData(url: string): HttpResponse<any> | null {
    const cacheEntry = this.get(url);

    if (cacheEntry) {
      log.debug(`Cache hit for key: "${url}"`);
    }

    return cacheEntry;
  }


  clearCache(url: string): void {
    this.storage.clear();
  }

  /**
   * Cleans cache entries older than the specified date.
   * @param expirationDate The cache expiration date. If no date is specified, all cache is cleared.
   */
  cleanCache(expirationDate?: Date) {
    // if (expirationDate) {
    //   each(this.cachedData, (value: HttpCacheEntry, key: string) => {
    //     if (expirationDate >= value.lastUpdated) {
    //       this.cachedData.delete(key);
    //     }
    //   });
    // } else {
    //   this.cachedData.clear();
    // }
    // this.saveCacheData();
  }

  /**
   * Sets the cache persistence policy.
   * Note that changing the cache persistence will also clear the cache from its previous storage.
   * @param persistence How the cache should be persisted, it can be either local or session storage, or if no value is
   *   provided it will be only in-memory (default).
   */
  setPersistence(persistence?: 'local' | 'session') {
    // NOTE use indexedDB instead
    this.cleanCache();
    this.storage = persistence === 'local' || persistence === 'session' ? window[persistence + 'Storage'] : null;
    // this.loadCacheData();
  }

}
