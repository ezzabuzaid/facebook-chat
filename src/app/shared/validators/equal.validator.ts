import { FormControl } from '@angular/forms';
export class PasswordEquivelant {
  /**
   *
   * @param name the name of control that should be checked with
   */
  static equal(name) {
    return (control: FormControl) => {
      if (control && control.parent) {
        const password = control.parent.get(name);
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
