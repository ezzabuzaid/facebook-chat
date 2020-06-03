export * from './string.validator';
export * from './numbers.validator';
export * from './phonenumber.validator';

export class ValidationPattern {
   static ENGLISH_ARABIC_LETTER = /^[\w\s\u0621-\u064A]+$/;
   static CONTAINS_DIGITS = /^\d+$/;
}
