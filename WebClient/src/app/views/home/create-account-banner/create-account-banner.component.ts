import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'pp-create-account-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './create-account-banner.component.html',
  styleUrls: ['./create-account-banner.component.scss'],
})
export class CreateAccountBannerComponent {

}
