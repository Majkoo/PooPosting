import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlTransformPipe } from './url-transform.pipe';



@NgModule({
    declarations: [
        UrlTransformPipe
    ],
    exports: [
        UrlTransformPipe
    ],
    imports: [
        CommonModule
    ]
})
export class UrlTransformModule { }
