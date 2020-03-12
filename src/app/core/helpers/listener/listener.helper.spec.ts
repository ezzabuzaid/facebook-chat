import { AppUtils } from '../utils';
import { Listener } from './listener.helper';

describe('Listener', () => {
    it('should not emit value if the default value is null or undefiend', () => {
        const listener = new Listener(null);
        expect(listener.value).toBeFalsy();
    });

    it('should emit a value if the default value is not null or undefiend', () => {
        const listener = new Listener('test');
        expect(listener.value).toBeTruthy();
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
});
