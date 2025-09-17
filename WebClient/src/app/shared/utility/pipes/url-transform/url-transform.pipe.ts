import { Pipe, PipeTransform } from '@angular/core';
import {environment} from "../../../../../environments/environment";

@Pipe({
  name: 'urlTransform'
})
export class UrlTransformPipe implements PipeTransform {
  transform(value?: string | null): string | null | undefined {
    if (!value) return value;
    if (value.startsWith('http://') || value.startsWith('https://'))
      return value;
    else
      return `${environment.apiUrl}/${value.replace(/\\/g, '/')}`;
  }
}
