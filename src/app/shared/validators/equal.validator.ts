import { FormControl } from '@angular/forms';
export class PasswordEquivelant {
  /**
   *
   * @param name the name of control that should be checked with
   */
  static equal<T>(name: keyof T) {
    return (control: FormControl) => {
      if (control && control.parent) {
        const password = control.parent.get(name as any);
        if (password && password.value === control.value) {
          return null;
        } else {
          return { notEqual: true };
        }
      }
      return null;
    };
  }
}
