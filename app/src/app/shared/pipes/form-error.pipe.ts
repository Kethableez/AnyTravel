import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formError'
})
export class FormErrorPipe implements PipeTransform {
  transform(errorKey: string): string {
    switch (errorKey) {
      case 'required':
        return 'To pole jest wymagane';
      case 'invalidEmail':
        return 'Zły format adresu e-mail';

      case 'minlength':
        return 'Za krótki';

      case 'maxlength':
        return 'Za długi';

      case 'taken':
        return 'Taki użytkownik już istnieje';

      case 'mustMatch':
        return 'Hasła muszą do siebie pasować';

      default:
        return 'Error';
    }
  }
}
