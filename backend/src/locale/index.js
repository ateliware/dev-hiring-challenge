import ptBr from './lang/ptBr';
import enUS from './lang/enUS';

export default function locale(lang) {
    switch (String(lang).toLowerCase().replace(/-/gm, '')) {
    case 'enus':
    case 'us':
        return enUS;
    default:
        return ptBr;
    }
}
