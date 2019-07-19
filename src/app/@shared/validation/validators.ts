import { Validators } from '@angular/forms';

export class ValidationPattern {
   static ENGLISH_ARABIC_LETTER = /^[\w\s\u0621-\u064A]+$/;
}

export class FieldValidation {
   static MOBILE = [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^\d+$/)];
   static EMAIL = [Validators.email];
   static USERNAME = [Validators.pattern(ValidationPattern.ENGLISH_ARABIC_LETTER), Validators.minLength(8), Validators.maxLength(16)];
   static PASSWORD = [Validators.required, Validators.minLength(8), Validators.maxLength(16)];
}