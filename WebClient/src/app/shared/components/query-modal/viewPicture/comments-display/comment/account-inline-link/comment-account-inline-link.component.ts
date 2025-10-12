import {Component, Input} from '@angular/core';

import {RouterLink} from "@angular/router";
import {UrlTransformModule} from "../../../../../../utility/pipes/url-transform/url-transform.module";
import {AccountDto} from "../../../../../../utility/dtos/AccountDto";
import {AccountPreviewDto} from "../../../../../../utility/dtos/AccountPreviewDto";

@Component({
    selector: 'pp-account-inline-link',
    standalone: true,
    imports: [RouterLink, UrlTransformModule],
    templateUrl: './comment-account-inline-link.component.html',
    styles: []
})
export class CommentAccountInlineLinkComponent {
  @Input({required: true}) acc!: AccountDto | AccountPreviewDto;
}
