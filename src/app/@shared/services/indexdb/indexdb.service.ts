import { Injectable } from '@angular/core';
import { ApplicationConstants, AppUtils } from '@core/helpers';
import { Observable, Observer, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


/**
 * This servic consume indexedDB which build on events, this will remove asap to be built upon promises using "idb" library
 */



@Injectable({
    providedIn: 'root'
})
export class IndexDBService {
    private storage: typeof indexedDB = null;

    private databaseName = ApplicationConstants.APPLICATION_NAME;
    private version = 4;

    private database: IDBDatabase = null;
    private objectStoreName = null;

    public onUpgrade = new Subject<IDBDatabase>();
    constructor() {
        // <meta property="description" content="">
        // <meta property="keywords" content="">
        // <meta property="og:description" content="">
        // <meta property="og:title" content="">
        // <meta property="og:image" content="">
        // <meta property="og:image:url" content="">
        try {
            // Workaround for service worker
            const $window = (window as any);
            // In the following line, you should include the prefixes of implementations you want to test.
            this.storage = $window.indexedDB || $window.mozIndexedDB || $window.webkitIndexedDB || $window.msIndexedDB;
            // DON'T use "var indexedDB = ..." if you're not in a function.
            // Moreover, you may need references to some $window.IDB* objects:
            // tslint:disable-next-line: max-line-length
            $window.IDBTransaction = $window.IDBTransaction || $window.webkitIDBTransaction || $window.msIDBTransaction || { READ_WRITE: 'readwrite' };
            // This line should only be needed if it is needed to support the object's constants for older browsers
            $window.IDBKeyRange = $window.IDBKeyRange || $window.webkitIDBKeyRange || $window.msIDBKeyRange;
            // (Mozilla has never prefixed these objects, so we don't need $window.mozIDB*)
        } catch (error) {

        }
    }

    private openDB() {
        const request = this.storage.open(this.databaseName, this.version);
        return this.database ? of(this.database) : new Observable((observer: Observer<IDBDatabase>) => {
            request.addEventListener('success', () => {
                console.log(`request.addEventListener('success')`);
                request.removeEventListener('success', () => {
                    observer.next(this.database = request.result);
                });
            });

            // NOTE this error handler will take control for all the other errors events, since the error is bubbles
            request.addEventListener('error', observer.error);

            // This event handles the event whereby a new version of
            // the database needs to be created Either one has not
            // been created before, or a new version number has been
            // submitted via the window.indexedDB.open
            request.addEventListener('upgradeneeded', ({ target }) => {
                this.onUpgrade.next(target['result'] as any);
            });
        });
    }

    private transaction(name: string[], accsess: IDBTransactionMode) {
        return this.openDB().pipe(map((database) => database.transaction(name, accsess)));
    }

    objectStore(name = this.objectStoreName) {

        if (!name) {
            throw new Error('Please provide object store name by calling configure() or by used method');
        }

        // for each operation a transaction will be opened, consider workaround it
        return this.transaction([name], 'readwrite').pipe(map((data) => data.objectStore(name)));
    }

    configure(options: IndexDBConfiguration) {
        // if all the required is the object store you can pass it in [objectStore] method
        this.objectStoreName = options.objectStoreName;
    }

    /**
     *
     */
    populate({ name, version }: IndexDBPopulation) {
        this.databaseName = name;
        this.version = version;
        return this;
    }

    deleteItem(id: string, objectStoreName = this.objectStoreName) {
        this.objectStore(objectStoreName)
            .pipe(map(object => {
                return object.delete(id);
            }));
    }

    getItem(id: string, objectStoreName = this.objectStoreName) {
        this.objectStore(objectStoreName)
            .pipe(map(object => {
                return object.get(id);
            }));
    }

    updateItem(id, objectStoreName = this.objectStoreName) {
        this.objectStore(objectStoreName)
            .pipe(map(object => {
                return object.put(id);
            }));
    }

}

interface IndexDBConfiguration {
    objectStoreName: string;
}

interface IndexDBPopulation {
    name: string;
    version: number;

}
