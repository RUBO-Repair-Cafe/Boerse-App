import { FormControl } from '@angular/forms';

export function validatePhoneNumber(c: FormControl) {
  const regex = new RegExp(/(\(?\+\(?49\)?|0?)[ ()]?([- ()]?\d[- ()]?){10}/)
  
  console.log('value', c.value);

  if (c.value === '' || c.value === null) return null;
  
  return regex.test(c.value) ? null : {
    phone: {
      valid: false
    }
  }
}