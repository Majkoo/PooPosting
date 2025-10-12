import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'pp-switch-btn',
    templateUrl: './switch-btn.component.html',
    standalone: true,
    imports: [CommonModule]
})
export class SwitchBtnComponent {
  @Input() switchValue: boolean = false;
  @Output() valueChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
}
