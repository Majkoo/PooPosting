import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pp-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tag.component.html',
  styles: [
  ]
})
export class TagComponent {
  @Input({required: true}) tag!: string;
}
