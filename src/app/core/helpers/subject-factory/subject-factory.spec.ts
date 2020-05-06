import { AppUtils } from '../utils';
import { SubjectFactory } from './subject-factory';
import { fakeAsync } from '@angular/core/testing';
import { Subject, BehaviorSubject } from 'rxjs';
xdescribe('SubjectFactory', () => {
    describe('should create subject if the initial value equal to', () => {
        [null, undefined].forEach(value => {
            it(`${value}`, () => {
                const subjectFactory = new SubjectFactory(value);
                expect(subjectFactory.subject).toBeInstanceOf(Subject)
            });
        });
    });

    describe('should create BehaviorSubject if the initial value not equal to', () => {
        [null, undefined].forEach(value => {
            it(`${value}`, () => {
                const subjectFactory = new SubjectFactory('value');
                expect(subjectFactory.subject).toBeInstanceOf(BehaviorSubject)
            });
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
    it('dispose should close the subjet', fakeAsync(async () => {
        const subject = new SubjectFactory();
        const spy = jasmine.createSpy();

        subject.listen().subscribe(spy);
        subject.dispose();
        subject.notify(10);
        expect(spy).not.toHaveBeenCalled();
    }));
});
