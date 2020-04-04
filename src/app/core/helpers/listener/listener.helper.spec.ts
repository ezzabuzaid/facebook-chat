import { AppUtils } from '../utils';
import { Listener } from './listener.helper';

describe('Listener', () => {
    describe('should not emit value if the default value is', () => {
        it('null', () => {
            const listener = new Listener(null);
            expect(listener.value).toBeFalsy();
        });
        it('undefiend', () => {
            const listener = new Listener(undefined);
            expect(listener.value).toBeFalsy();
        });
    });

    describe('should emit a value if the default value is not null or undefiend', () => {
        [false, true, '', 'string', new Object(), new Map(), new WeakMap(), new Set(), new WeakSet()]
            .forEach(element => {
                const listener = new Listener(element);
                expect(listener.value).toBeTruthy();
            });
    });

    it('should tell that a value reached', (done) => {
        const listener = new Listener('test');
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
        const listener = new Listener();
        listener.listen()
            .subscribe(data => { }, () => { }, () => {
                expect(true).toBeTruthy();
            });
        listener.dispose();
    });
});
