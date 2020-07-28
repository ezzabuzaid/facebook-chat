
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { defer, Subject } from 'rxjs';
declare const expect: any;

/**
 * Create async observable that emits-once and completes
 */
export function asyncData<T>(data: T = null) {
    return defer(() => Promise.resolve(data));
}

/**
 *  Create async observable error that errors
 */
export function asyncError<T>(errorObject: any) {
    return defer(() => Promise.reject(errorObject));
}


export function apiUrl(path: string) {
    return environment.endpointUrl + path;
}

export function assertPost(url: string, body = null) {
    const httpMock = TestBed.inject(HttpTestingController);

    const mockRequest = httpMock.expectOne(apiUrl(url));
    mockRequest.flush(body);
    expect(mockRequest.request.method).toBe('POST');
    return mockRequest;
}

export function assertGet<T>(url: string, body: T, callback: (request: TestRequest) => void = () => { }) {
    const httpMock = TestBed.inject(HttpTestingController);
    const mockRequest = httpMock.expectOne(apiUrl(url));
    callback(mockRequest);
    mockRequest.flush(body);
    expect(mockRequest.request.method).toBe('GET');
    return mockRequest;
}

export function getTableHeaderCell(element: HTMLElement, columnName: string) {
    return element.querySelector(`.mat-header-cell.mat-column-${ columnName }`);
}

export function getTableBodyCells(element: HTMLElement, columnName: string) {
    return element.querySelectorAll<HTMLTableDataCellElement>(`.mat-cell.mat-column-${ columnName }`);
}

export function getTableCell(element: HTMLTableRowElement, columnName: string) {
    return element.querySelector(`.mat-column-${ columnName }`);
}

export function checkCell(tableRow: HTMLTableRowElement, index, name: string, title: string) {
    const column = getTableCell(tableRow, name);

    expect(column).toBeTruthy();
    expect(column.textContent.trim()).toMatch(title);
    expect(tableRow.cells[index].innerHTML.trim()).toBe(title);
    return true;
}


export class TestUtility<T> {

    constructor(
        public fixture: ComponentFixture<T>,
    ) { }

    getComponent<Y>(componentType: Type<Y>): Y {
        return this.getComponentDebug(componentType).componentInstance;
    }

    getComponentElement<Y>(componentType: Type<Y>): HTMLElement {
        return this.getComponentDebug(componentType).nativeElement;
    }

    getComponentDebug<Y>(componentType: Type<Y>) {
        return this.fixture.debugElement.query(By.directive(componentType));
    }

    querySelector<Y = HTMLElement>(selector: string, parent = this.fixture.debugElement.nativeElement): Y {
        return parent.querySelector(selector);
    }

    querySelectorAll<Y = Element>(selector: string, parent = (this.element as HTMLElement)): Y[] {
        return Array.from(parent.querySelectorAll(selector)) as unknown as Y[];
    }

    advance(duration: number = null) {
        tick(duration);
        this.fixture.detectChanges();
    }

    detectChanges() {
        this.fixture.detectChanges();
    }

    get element() {
        return this.fixture.debugElement.nativeElement;
    }

    assertOnDestroyHasUnsubscribed(subscription: Subject<any> = this.fixture.componentInstance['subscription']) {
        spyOn(subscription, 'next');
        spyOn(subscription, 'complete');
        (this.fixture.componentInstance as any).ngOnDestroy();
        expect(subscription.next).toHaveBeenCalledTimes(1);
        expect(subscription.complete).toHaveBeenCalledTimes(1);
    }

}
