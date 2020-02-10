import {
    trigger,
    state,
    stagger,
    style,
    animate,
    transition,
    query
} from '@angular/animations';

export const fadeCR = trigger('fadeCR',[
    state('ATIVO',style({
        opacity:1
    })),
    state('NAO_ATIVO',style({
        opacity:0,
    })),
    transition('NAO_ATIVO<=>ATIVO',[animate('1s')]),
])