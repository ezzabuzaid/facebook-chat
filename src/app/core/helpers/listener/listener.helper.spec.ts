import { AppUtils } from '../utils';
import { SubjectFactory } from './listener.helper';

describe('Listener', () => {
    describe('should not emit value if the default value is', () => {
        it('null', () => {
            const listener = new SubjectFactory(null);
            expect(listener.value).toBeFalsy();
        });
        it('undefiend', () => {
            const listener = new SubjectFactory(undefined);
            expect(listener.value).toBeFalsy();
        });
    });

    describe('should emit a value if the default value is not null or undefiend', () => {
        [false, true, '', 'string', new Object(), new Map(), new WeakMap(), new Set(), new WeakSet()]
            .forEach(element => {
                const listener = new SubjectFactory(element);
                expect(listener.value).toBeTruthy();
            });
    });

    it('should tell that a value reached', (done) => {
        const listener = new SubjectFactory('test');
        const value = AppUtils.generateAlphabeticString();
        listener.notify(value);
        listener.listen()
            .subscribe(data => {
                expect(data).toEqual(value);
                expect(listener.value).toEqual(data);
                done();
            });
    });
    it('dispose should close the subjet', (done) => {
        const listener = new SubjectFactory();
        listener.listen()
            .subscribe(data => { }, () => { }, () => {
                expect(true).toBeTruthy();
            });
        listener.dispose();
    });
});
