import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SwitchBtnComponent } from '../switch-btn/switch-btn.component';

@Component({
    selector: 'pp-setting-option',
    templateUrl: './setting-option.component.html',
    standalone: true,
    imports: [SwitchBtnComponent]
})
export class SettingOptionComponent {
  @Input({required: true}) text!: string;
  @Input() switchValue: boolean = false;
  @Output() valueChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
}
