import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from "primeng/dialog";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'pp-login-popup',
  standalone: true,
  imports: [CommonModule, DialogModule, RouterLink],
  templateUrl: './login-popup.component.html',
})
export class LoginPopupComponent {
  @Input() header: string = "Login to access this feachure";
  @Input({required: true}) dialogVisible: boolean = false;
  @Output() dialogVisibleChange = new EventEmitter<boolean>();
  
  closeDialog() {
    this.dialogVisibleChange.emit(true);
  }

}