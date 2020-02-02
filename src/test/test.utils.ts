import { defer } from 'rxjs';
import { tick, ComponentFixture, TestBed } from '@angular/core/testing';

export function advance(fixture: ComponentFixture<any>) {
    tick();
    fixture.detectChanges();
}
// Create async observable that emits-once and completes
export function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
}

// Create async observable error that errors
export function asyncError<T>(errorObject: any) {
    return defer(() => Promise.reject(errorObject));
}

export function getService<T>(service): T {
    return TestBed.inject(service);
}
