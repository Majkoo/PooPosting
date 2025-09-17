import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo',
  standalone: true
})
export class DateAgoPipe implements PipeTransform {
  divider = [60, 60, 24, 30, 12];
  string = [' second', ' minute', ' hour', ' day', ' months', 'year'];

  transform(value: any, ...args: unknown[]): unknown {
    if (!value) { return 'some time ago'; }
    let time = (Date.now() - Date.parse(value)) / 1000;
    if (time < 60) {
      return 'just now';
    }
    let i;
    for (i = 0; Math.floor(time / this.divider[i]) > 0; i++) {
      time /= this.divider[i];
    }
    const plural = this.generatePlural(time, i);
    return Math.floor(time) + plural + ' ago';
  }

  private generatePlural(time: number, timestampIndex: number) {
    if (Math.floor(time) === 1) {
      return this.string[timestampIndex];
    } else {
      return this.string[timestampIndex] + 's';
    }
  }
}
