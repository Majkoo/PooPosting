import { Component } from '@angular/core';
import {fadeInAnimation} from "../../shared/utility/animations/fadeInAnimation";

@Component({
    selector: 'pp-auth-layout',
    templateUrl: './auth-layout.component.html',
    styleUrls: ['./auth-layout.component.scss'],
    animations: [fadeInAnimation],
    standalone: false
})
export class AuthLayoutComponent {

}
