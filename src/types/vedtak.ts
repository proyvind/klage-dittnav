export class Vedtak {
    tittel?: string = '';
    vedtaksdato: string = new Date().toISOString().substring(0, 10);
    tema: string = '';
    enhet: string = '';
    NAV_referanse: string = '';
}
