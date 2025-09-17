import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

export const likeStateAnimation =  trigger('likedState', [
  state('true', style({})),
  state('false', style({})),
  transition('false => true', animate('200ms',
    keyframes([
      style({ transform: 'scale(1)', opacity: 1, offset: 0 }),
      style({ transform: 'scale(1.2)', opacity: 0.7, offset: 0.5 }),
      style({ transform: 'scale(1)', opacity: 1, offset: 1 })
    ]))),
  transition('true => false', animate('200ms',
    keyframes([
      style({ transform: 'scale(1)', opacity: 1, offset: 0 }),
      style({ transform: 'scale(1.2)', opacity: 0.7, offset: 0.5 }),
      style({ transform: 'scale(1)', opacity: 1, offset: 1 })
  ])))
])
