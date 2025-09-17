import {animate, state, style, transition, trigger} from "@angular/animations";

export const validationErrorAnimation =
  trigger('errorAnimation', [
    state('hidden', style({ height: '0', opacity: 0 })),
    state('visible', style({ height: '*', opacity: 1 })),
    transition('hidden <=> visible', animate('150ms ease-in-out')),
  ]);
