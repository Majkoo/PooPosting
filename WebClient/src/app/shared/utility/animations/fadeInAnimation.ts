import {animate, state, style, transition, trigger} from "@angular/animations";

export const fadeInAnimation = trigger('fadeIn', [
  state('void', style({ opacity: 0 })),
  transition(':enter',
    [
      style({
          opacity: 0
      }),
      animate('150ms ease-in-out', style({
          opacity: 1
        })
      )
    ]
  ),
])
