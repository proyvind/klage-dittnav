import { TemaKey } from '../tema/tema';

class Titles {
    private titles: Record<string, string> = {
        ALDERSPENSJON: 'Alderspensjon',
        ARBEID: 'Arbeid',
        ARBEIDSAVKLARINGSPENGER: 'Arbeidsavklaringspenger (AAP)',
        AVTALEFESTET_PENSJON: 'Avtalefestet pensjon (AFP)',
        BARNEBIDRAG_OG_BIDRAGSFORSKUDD: 'Barnebidrag og bidragsforskudd',
        BARNEPENSJON: 'Barnepensjon',
        BARNETRYGD: 'Barnetrygd',
        BILSTONAD: 'Stønad til bil og spesialutstyr til kjøretøy',
        DAGPENGER: 'Dagpenger',
        EKTEFELLEBIDRAG: 'Ektefellebidrag',
        ENGANGSSTONAD: 'Engangsstønad',
        ENSLIG_MOR_ELLER_FAR: 'Enslig mor eller far',
        FORELDREPENGER_GENERELL: 'Foreldrepenger, engangsstønad og svangerskapspenger',
        FORELDREPENGER: 'Foreldrepenger',
        GJENLEVENDE: 'Pensjon til gjenlevende ektefelle eller samboer',
        GRAVFERDSSTONAD: 'Gravferdsstønad',
        GRUNN_OG_HJELPESTONAD: 'Grunnstønad og hjelpestønad',
        HJELPEMIDLER: 'Hjelpemidler og tilrettelegging ved nedsatt funksjonsevne',
        KONTANTSTOTTE: 'Kontantstøtte',
        KRIGSPENSJON: 'Krigspensjon',
        LONNSGARANTI: 'Lønnsgaranti ved konkurs hos arbeidsgiver',
        LONNSKOMPENSASJON: 'Lønnskompensasjon for permitterte',
        MIDLERTIDIG_KOMPENSASJON: 'Midlertidig kompensasjon for selvstendig næringsdrivende og frilansere',
        NAV_LOVEN_14A: 'Vurdering av behov for bistand etter NAV loven § 14 a',
        OKONOMISK_SOSIALHJELP: 'Midlertidig økonomisk sosialhjelp',
        OPPFOSTRINGSBIDRAG: 'Oppfostringsbidrag',
        OPPHOLD_ELLER_ARBEID_I_NORGE: 'Opphold eller arbeid i Norge',
        OPPHOLD_ELLER_ARBEID_UTENFOR_NORGE: 'Opphold eller arbeid utenfor Norge',
        SUPPLERENDE_STONAD: 'Supplerende stønad til pensjon ved kort botid i Norge',
        SVANGERSKAPSPENGER: 'Svangerskapspenger',
        SYKDOM_I_FAMILIEN: 'Omsorgspenger, opplæringspenger, pleiepenger',
        SYKEPENGER: 'Sykepenger',
        TIDLIGERE_FAMILIEPLEIER: 'Ytelser til tidligere familiepleier',
        TILTAKSPENGER: 'Tiltakspenger for arbeidsrettet tiltak',
        UFORETRYGD: 'Uføretrygd',
        YRKESSKADETRYGD: 'Yrkesskade og yrkesskadetrygd',
        AAP: 'Arbeidsavklaringspenger',
        AAR: 'Aa-registeret',
        AGR: 'Ajourhold - Grunnopplysninger',
        BAR: 'Barnetrygd',
        BID: '1 - Bidrag',
        BII: '2 - Bidrag innkreving',
        BIL: 'Bil',
        DAG: 'Dagpenger',
        ENF: 'Enslig forsørger',
        ERS: 'Erstatning',
        FAR: 'Farskap',
        FEI: 'Feilutbetaling',
        FOR: 'Foreldre- og svangerskapspenger',
        FOS: 'Forsikring',
        FRI: 'Kompensasjon selvstendig næringsdrivende/frilansere',
        FUL: 'Fullmakt',
        GEN: 'Generell',
        GRA: 'Gravferdsstønad',
        GRU: 'Grunn- og hjelpestønad',
        HEL: 'Helsetjenester og ort. hjelpemidler',
        HJE: 'Hjelpemidler',
        IAR: 'Inkluderende Arbeidsliv ',
        IND: 'Individstønad',
        KLA: 'Klage/Anke',
        KNA: 'Kontakt NAV',
        KOM: 'Kommunale tjenester',
        KON: 'Kontantstøtte',
        KTR: 'Kontroll',
        LGA: 'Lønnsgaranti',
        MED: 'Medlemskap',
        MOB: 'Mob.stønad',
        MOT: '3 - Skanning',
        OKO: 'Økonomi',
        OMS: 'Omsorgspenger, Pleiepenger og opplæringspenger',
        OPA: 'Oppfølging - Arbeidsgiver',
        OPP: 'Oppfølging',
        OVR: '4 - Øvrig',
        PEN: 'Pensjon',
        PER: 'Permittering og masseoppsigelser',
        REH: 'Rehabilitering',
        REK: 'Rekruttering og Stilling',
        RPO: 'Retting av personopplysninger',
        RVE: 'Rettferdsvederlag',
        SAA: 'Sanksjon - Arbeidsgiver',
        SAK: 'Saksomkostning',
        SAP: 'Sanksjon - Person',
        SER: 'Serviceklager',
        SIK: 'Sikkerhetstiltak',
        STO: 'Regnskap/utbetaling',
        SUP: 'Supplerende stønad',
        SYK: 'Sykepenger',
        SYM: 'Sykemeldinger',
        TIL: 'Tiltak',
        TRK: 'Trekkhåndtering',
        TRY: 'Trygdeavgift',
        TSO: 'Tilleggsstønad',
        TSR: 'Tilleggsstønad arbeidssøkere',
        UFM: 'Unntak fra medlemskap',
        UFO: 'Uføretrygd',
        UKJ: 'Ukjent',
        VEN: 'Ventelønn',
        YRA: 'Yrkesrettet attføring',
        YRK: 'Yrkesskade / Menerstatning'
    };

    private titleKeys: string[] = Object.keys(this.titles);

    private isString = (key?: string | null): key is string => typeof key === 'string';

    public isTitleKey = (titleKey?: string | null): titleKey is string =>
        this.isString(titleKey) && this.titleKeys.includes(titleKey);

    public getTitle(titleKey?: string | TemaKey | null): string | null {
        if (this.isTitleKey(titleKey)) {
            return this.titles[titleKey];
        }

        return null;
    }

    public getTemaTitle = (temaKey: TemaKey) => this.titles[temaKey];

    public ensureTitleKey = (titleKey?: string | null): string | null => (this.isTitleKey(titleKey) ? titleKey : null);
}

export const TITLES = new Titles();

export const useTitleOrYtelse = (temaKey: TemaKey, titleKey?: string | null, ytelse?: string | null) =>
    TITLES.getTitle(titleKey) ?? ytelse ?? TITLES.getTemaTitle(temaKey);

export const useTitle = (titleKey: string) => TITLES.getTitle(titleKey) ?? 'Tittel mangler';
