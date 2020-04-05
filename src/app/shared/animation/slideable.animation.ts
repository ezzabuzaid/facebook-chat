import { trigger, state, style, transition, animate } from '@angular/animations';

export const slideableAnimation = trigger('slide', [
    state('left', style({ transform: 'translateX(0)' })),
    state('right', style({ transform: 'translateX(-50%)' })),
    transition('* => *', [
        style({
            height: '100%',
            width: '200%',
            display: 'flex'
        }),
        animate(300)]
    )
])