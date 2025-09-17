import {Directive, HostListener, inject, Input} from '@angular/core';
import {QueryModalEnum} from "./query-modal.enum";
import {ActivatedRoute, Router} from "@angular/router";

@Directive({
  selector: '[ppOpenQueryModal]',
  standalone: true
})
export class OpenQueryModalDirective {
  @Input('modalMode') modalMode!: QueryModalEnum;
  @Input('id') id!: string;

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  @HostListener('click') onClick() {
    const queryParams = { [this.modalMode.toString()]: this.id };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
      fragment: this.route.snapshot.fragment || undefined
    });
  }
}
