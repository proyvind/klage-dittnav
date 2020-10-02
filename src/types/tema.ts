export enum Tema {
    AAP = 'Arbeidsavklaringspenger',
    AAR = 'Aa-registeret',
    AGR = 'Ajourhold - Grunnopplysninger',
    BAR = 'Barnetrygd',
    BID = '1 - Bidrag',
    BII = '2 - Bidrag innkreving',
    BIL = 'Bil',
    DAG = 'Dagpenger',
    ENF = 'Enslig forsørger',
    ERS = 'Erstatning',
    FAR = 'Farskap',
    FEI = 'Feilutbetaling',
    FOR = 'Foreldre- og svangerskapspenger',
    FOS = 'Forsikring',
    FRI = 'Kompensasjon selvstendig næringsdrivende/frilansere',
    FUL = 'Fullmakt',
    GEN = 'Generell',
    GRA = 'Gravferdsstønad',
    GRU = 'Grunn- og hjelpestønad',
    HEL = 'Helsetjenester og ort. hjelpemidler',
    HJE = 'Hjelpemidler',
    IAR = 'Inkluderende Arbeidsliv ',
    IND = 'Individstønad',
    KLA = 'Klage/Anke',
    KNA = 'Kontakt NAV',
    KOM = 'Kommunale tjenester',
    KON = 'Kontantstøtte',
    KTR = 'Kontroll',
    LGA = 'Lønnsgaranti',
    MED = 'Medlemskap',
    MOB = 'Mob.stønad',
    MOT = '3 - Skanning',
    OKO = 'Økonomi',
    OMS = 'Omsorgspenger, Pleiepenger og opplæringspenger',
    OPA = 'Oppfølging - Arbeidsgiver',
    OPP = 'Oppfølging',
    OVR = '4 - Øvrig',
    PEN = 'Pensjon',
    PER = 'Permittering og masseoppsigelser',
    REH = 'Rehabilitering',
    REK = 'Rekruttering og Stilling',
    RPO = 'Retting av personopplysninger',
    RVE = 'Rettferdsvederlag',
    SAA = 'Sanksjon - Arbeidsgiver',
    SAK = 'Saksomkostning',
    SAP = 'Sanksjon - Person',
    SER = 'Serviceklager',
    SIK = 'Sikkerhetstiltak',
    STO = 'Regnskap/utbetaling',
    SUP = 'Supplerende stønad',
    SYK = 'Sykepenger',
    SYM = 'Sykemeldinger',
    TIL = 'Tiltak',
    TRK = 'Trekkhåndtering',
    TRY = 'Trygdeavgift  ',
    TSO = 'Tilleggsstønad',
    TSR = 'Tilleggsstønad arbeidssøkere',
    UFM = 'Unntak fra medlemskap',
    UFO = 'Uføretrygd',
    UKJ = 'Ukjent',
    VEN = 'Ventelønn',
    YRA = 'Yrkesrettet attføring',
    YRK = 'Yrkesskade / Menerstatning'
}

export type TemaKey = keyof typeof Tema;

const TEMA_KEYS = Object.keys(Tema);

export const getYtelseByTema = (temaKey: TemaKey | string | null): Tema | null => {
    const ensuredTemaKey = ensureStringIsTema(temaKey);
    if (ensuredTemaKey === null) {
        return null;
    }
    return Tema[ensuredTemaKey];
};

export const ensureStringIsTema = (potentialTemaKey: string | null): TemaKey | null => {
    if (potentialTemaKey === null) {
        return null;
    }
    return TEMA_KEYS.includes(potentialTemaKey) ? (potentialTemaKey as TemaKey) : null;
};
