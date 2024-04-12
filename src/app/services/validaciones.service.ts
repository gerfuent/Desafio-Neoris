import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }

  validadorAño(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('/^[0-9]+$/;');
      console.log(control.value);
      console.log(regex.test("2005"));
      const valid = regex.test(control.value);
      return valid ? null : { invalidYear: true };
    };
  }
}
