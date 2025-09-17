import {animate, state, style, transition, trigger} from "@angular/animations";

export const fadeInOutAnimation = trigger('fadeInOut', [
  state('void', style({ opacity: 0 })),
  transition(':enter, :leave',
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
