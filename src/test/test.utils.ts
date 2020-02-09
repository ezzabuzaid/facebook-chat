
import { Type } from '@angular/core';
import { defer, from } from 'rxjs';
import { tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from '@environments/environment';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpMethod } from '@core/http';
import { By } from '@angular/platform-browser';
declare const expect: any;
export function advance(fixture: ComponentFixture<any>) {
    tick();
    fixture.detectChanges();
}

// Create async observable that emits-once and completes
export function asyncData<T>(data: T = null) {
    return defer(() => Promise.resolve(data));
}

// Create async observable error that errors
export function asyncError<T>(errorObject: any) {
    return defer(() => Promise.reject(errorObject));
}

export function getService<T>(token): T {
    return TestBed.get(token);
}

export function apiUrl(path: string) {
    return environment.endpointUrl + path;
}

export function assertPost(url: string, body = null) {
    const httpMock = getService<HttpTestingController>(HttpTestingController);

    const mockRequest = httpMock.expectOne(apiUrl(url));
    mockRequest.flush(body);
    expect(mockRequest.request.method).toBe(HttpMethod.POST);
    return mockRequest;
}

export function assertGet<T>(url: string, body: T) {
    const httpMock = getService<HttpTestingController>(HttpTestingController);

    const mockRequest = httpMock.expectOne(apiUrl(url));
    mockRequest.flush(body);
    expect(mockRequest.request.method).toBe(HttpMethod.GET);
    return mockRequest;
}

export function getTableHeaderCell(element: HTMLElement, columnName: string) {
    return element.querySelector(`.mat-header-cell.mat-column-${columnName}`);
}

export function getTableBodyCells(element: HTMLElement, columnName: string) {
    return element.querySelectorAll<HTMLTableDataCellElement>(`.mat-cell.mat-column-${columnName}`);
}


export class TestUtility<T> {
    constructor(
        public fixture: ComponentFixture<T>,
    ) { }

    getComponent<Y>(componentType: Type<Y>): Y {
        return this.fixture.debugElement.query(By.directive(componentType)).componentInstance;
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

}

