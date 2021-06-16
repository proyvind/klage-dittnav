import { EnvString } from '../environment/environment';
import { Languages } from '../language/language';
import { TemaKey } from '../tema/tema';

export const klageFormUrl: StringValue = {
    [Languages.nb]: 'https://www.nav.no/soknader/nb/klage/person',
    [Languages.en]: 'https://www.nav.no/soknader/en/klage/person'
};

export type StringValue = {
    [key in Languages]: string;
};

export interface InngangKategori {
    title: StringValue;
    path: string;
    beskrivelse: StringValue;
    kategorier: Kategori[];
    externalUrl?: StringValue;
}

export interface Kategori {
    temaKey: TemaKey;
    titleKey: string;
    allowsAnke: boolean;
    digitalKlage: EnvString[];
    digitalKlageFullmakt: boolean;
    path: string;
    mailKlageUrl: StringValue;
    mailAnkeUrl?: StringValue;
    externalUrl?: StringValue;
}

export const INNGANG_KATEGORIER: InngangKategori[] = [
    {
        title: {
            [Languages.nb]: 'Korona / Covid-19',
            [Languages.en]: 'Corona / COVID-19'
        },
        path: 'korona',
        beskrivelse: {
            [Languages.nb]: 'Midlertidige ordninger',
            [Languages.en]: 'Temporary schemes (midlertidige ordninger)'
        },
        kategorier: [
            {
                temaKey: TemaKey.DAG,
                titleKey: 'DAGPENGER_FERIEPENGER',
                allowsAnke: true,
                digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
                digitalKlageFullmakt: false,
                path: 'dagpenger-feriepenger',
                mailKlageUrl: {
                    [Languages.nb]: 'https://www.nav.no/soknader/nb/person/arbeid/dagpenger/NAV%2004-01.03/klage/brev',
                    [Languages.en]: 'https://www.nav.no/soknader/en/person/arbeid/dagpenger/NAV%2004-01.03/klage/brev'
                },
                mailAnkeUrl: {
                    [Languages.nb]: 'https://www.nav.no/soknader/nb/person/arbeid/dagpenger/NAV%2004-01.03/anke/brev',
                    [Languages.en]: 'https://www.nav.no/soknader/en/person/arbeid/dagpenger/NAV%2004-01.03/anke/brev'
                }
            },
            {
                temaKey: TemaKey.DAG,
                titleKey: 'DAGPENGER_TILBAKEBETALING_FORSKUDD',
                allowsAnke: false,
                digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
                digitalKlageFullmakt: false,
                path: 'dagpenger-tilbakebetaling-forskudd',
                mailKlageUrl: {
                    [Languages.nb]: 'https://www.nav.no/soknader/nb/person/arbeid/dagpenger/NAV%2004-01.03/klage/brev',
                    [Languages.en]: 'https://www.nav.no/soknader/en/person/arbeid/dagpenger/NAV%2004-01.03/klage/brev'
                },
                mailAnkeUrl: {
                    [Languages.nb]: 'https://www.nav.no/soknader/nb/person/arbeid/dagpenger/NAV%2004-01.03/anke/brev',
                    [Languages.en]: 'https://www.nav.no/soknader/en/person/arbeid/dagpenger/NAV%2004-01.03/anke/brev'
                }
            },
            {
                temaKey: TemaKey.DAG,
                titleKey: 'LONNSKOMPENSASJON',
                allowsAnke: false,
                digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
                digitalKlageFullmakt: false,
                path: 'lonnskompensasjon',
                mailAnkeUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/korona/lonnskompensasjon-ettersendelse-klage',
                    [Languages.en]: 'https://www.nav.no/soknader/en/person/korona/lonnskompensasjon-ettersendelse-klage'
                },
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/korona/lonnskompensasjon-ettersendelse-klage',
                    [Languages.en]: 'https://www.nav.no/soknader/en/person/korona/lonnskompensasjon-ettersendelse-klage'
                }
            },
            {
                temaKey: TemaKey.GEN,
                titleKey: 'MIDLERTIDIG_KOMPENSASJON',
                allowsAnke: false,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'midlertidig-kompensasjon',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/korona/kompensasjon/NAV%2000-03.00/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/korona/kompensasjon/NAV%2000-03.00/klage/brev'
                }
            }
        ]
    },
    {
        title: {
            [Languages.nb]: 'Arbeid',
            [Languages.en]: 'Work'
        },
        path: 'arbeid',
        beskrivelse: {
            [Languages.nb]: 'Dagpenger, AAP, tiltakspenger',
            [Languages.en]:
                'Uemployment benefit (dagpenger), work assessment allowance (AAP), benefits while participating in employment schemes (tiltakspenger)'
        },
        kategorier: [
            {
                temaKey: TemaKey.DAG,
                titleKey: 'DAGPENGER',
                allowsAnke: true,
                digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
                digitalKlageFullmakt: false,
                path: 'dagpenger',
                mailKlageUrl: {
                    [Languages.nb]: 'https://www.nav.no/soknader/nb/person/arbeid/dagpenger/NAV%2004-01.03/klage/brev',
                    [Languages.en]: 'https://www.nav.no/soknader/en/person/arbeid/dagpenger/NAV%2004-01.03/klage/brev'
                },
                mailAnkeUrl: {
                    [Languages.nb]: 'https://www.nav.no/soknader/nb/person/arbeid/dagpenger/NAV%2004-01.03/anke/brev',
                    [Languages.en]: 'https://www.nav.no/soknader/en/person/arbeid/dagpenger/NAV%2004-01.03/anke/brev'
                }
            },
            {
                temaKey: TemaKey.DAG,
                titleKey: 'DAGPENGER_FERIEPENGER',
                allowsAnke: true,
                digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
                digitalKlageFullmakt: false,
                path: 'dagpenger-feriepenger',
                mailKlageUrl: {
                    [Languages.nb]: 'https://www.nav.no/soknader/nb/person/arbeid/dagpenger/NAV%2004-01.03/klage/brev',
                    [Languages.en]: 'https://www.nav.no/soknader/en/person/arbeid/dagpenger/NAV%2004-01.03/klage/brev'
                },
                mailAnkeUrl: {
                    [Languages.nb]: 'https://www.nav.no/soknader/nb/person/arbeid/dagpenger/NAV%2004-01.03/anke/brev',
                    [Languages.en]: 'https://www.nav.no/soknader/en/person/arbeid/dagpenger/NAV%2004-01.03/anke/brev'
                }
            },
            {
                temaKey: TemaKey.DAG,
                titleKey: 'DAGPENGER_TILBAKEBETALING_FORSKUDD',
                allowsAnke: false,
                digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
                digitalKlageFullmakt: false,
                path: 'dagpenger-tilbakebetaling-forskudd',
                mailKlageUrl: {
                    [Languages.nb]: 'https://www.nav.no/soknader/nb/person/arbeid/dagpenger/NAV%2004-01.03/klage/brev',
                    [Languages.en]: 'https://www.nav.no/soknader/en/person/arbeid/dagpenger/NAV%2004-01.03/klage/brev'
                },
                mailAnkeUrl: {
                    [Languages.nb]: 'https://www.nav.no/soknader/nb/person/arbeid/dagpenger/NAV%2004-01.03/anke/brev',
                    [Languages.en]: 'https://www.nav.no/soknader/en/person/arbeid/dagpenger/NAV%2004-01.03/anke/brev'
                }
            },
            {
                temaKey: TemaKey.AAP,
                titleKey: 'ARBEIDSAVKLARINGSPENGER',
                allowsAnke: true,
                digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
                digitalKlageFullmakt: false,
                path: 'arbeidsavklaringspenger',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/arbeid/arbeidsavklaringspenger/NAV%2011-13.05/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/arbeid/arbeidsavklaringspenger/NAV%2011-13.05/klage/brev'
                },
                mailAnkeUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/arbeid/arbeidsavklaringspenger/NAV%2011-13.05/anke/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/arbeid/arbeidsavklaringspenger/NAV%2011-13.05/anke/brev'
                }
            },
            {
                temaKey: TemaKey.GEN,
                titleKey: 'LONNSGARANTI',
                allowsAnke: false,
                digitalKlage: [EnvString.DEV, EnvString.LOCAL],
                digitalKlageFullmakt: false,
                path: 'lonnsgaranti',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/arbeid/lonnsgaranti-arbeidsgiver-betaler-ikke-ut-lonn/NAV%2067-01.01/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/arbeid/lonnsgaranti-arbeidsgiver-betaler-ikke-ut-lonn/NAV%2067-01.01/klage/brev'
                }
            },
            {
                temaKey: TemaKey.IND,
                titleKey: 'TILTAKSPENGER',
                allowsAnke: false,
                digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
                digitalKlageFullmakt: false,
                path: 'tiltakspenger',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/arbeid/tiltakspenger/NAV%2076-13.45/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/arbeid/tiltakspenger/NAV%2076-13.45/klage/brev'
                }
            },
            {
                temaKey: TemaKey.OPP,
                titleKey: 'NAV_LOVEN_14A',
                allowsAnke: false,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'nav-loven-14a',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/arbeid/Bistand-fra-NAV-for-a-komme-i-arbeid/NAV%2000-01.00/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/arbeid/Bistand-fra-NAV-for-a-komme-i-arbeid/NAV%2000-01.00/klage/brev'
                }
            }
        ]
    },
    {
        title: { [Languages.nb]: 'Helse', [Languages.en]: 'Health' },
        path: 'helse',
        beskrivelse: {
            [Languages.nb]: 'Sykepenger, uføre, yrkesskade',
            [Languages.en]: 'Sickness benefit (sykepenger), disability (uføre), occupational injury (yrkesskade)'
        },
        kategorier: [
            {
                temaKey: TemaKey.SYK,
                titleKey: 'SYKEPENGER',
                allowsAnke: true,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'sykepenger',
                mailKlageUrl: {
                    [Languages.nb]: 'https://www.nav.no/soknader/nb/person/helse/sykepenger/NAV%2000-03.00/klage/brev',
                    [Languages.en]: 'https://www.nav.no/soknader/en/person/helse/sykepenger/NAV%2000-03.00/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]: 'https://www.nav.no/soknader/nb/person/helse/sykepenger/NAV%2000-03.00/anke/brev',
                    [Languages.en]: 'https://www.nav.no/soknader/en/person/helse/sykepenger/NAV%2000-03.00/anke/brev'
                }
            },
            {
                temaKey: TemaKey.AAP,
                titleKey: 'ARBEIDSAVKLARINGSPENGER',
                allowsAnke: true,
                digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
                digitalKlageFullmakt: false,
                path: 'arbeidsavklaringspenger',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/arbeid/arbeidsavklaringspenger/NAV%2011-13.05/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/arbeid/arbeidsavklaringspenger/NAV%2011-13.05/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/arbeid/arbeidsavklaringspenger/NAV%2011-13.05/anke/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/arbeid/arbeidsavklaringspenger/NAV%2011-13.05/anke/brev'
                }
            },
            {
                temaKey: TemaKey.UFO,
                titleKey: 'UFORETRYGD',
                allowsAnke: true,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'uforetrygd',
                mailKlageUrl: {
                    [Languages.nb]: 'https://www.nav.no/soknader/nb/person/helse/uforetrygd/NAV%2012-06.05/klage/brev',
                    [Languages.en]: 'https://www.nav.no/soknader/en/person/helse/uforetrygd/NAV%2012-06.05/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]: 'https://www.nav.no/soknader/nb/person/helse/uforetrygd/NAV%2012-06.05/anke/brev',
                    [Languages.en]: 'https://www.nav.no/soknader/en/person/helse/uforetrygd/NAV%2012-06.05/anke/brev'
                }
            },
            {
                temaKey: TemaKey.SUP,
                titleKey: 'SUPPLERENDE_STONAD_UFORE_FLYKTNINGER',
                allowsAnke: true,
                digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
                digitalKlageFullmakt: false,
                path: 'supplerende-stonad-ufore-flyktninger',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/pensjon/supplerende-stonad-til-ufor-flyktning/NAV%2064-01.00/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/pensjon/supplerende-stonad-til-ufor-flyktning/NAV%2064-01.00/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/pensjon/supplerende-stonad-til-ufor-flyktning/NAV%2064-01.00/anke/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/pensjon/supplerende-stonad-til-ufor-flyktning/NAV%2064-01.00/anke/brev'
                }
            },
            {
                temaKey: TemaKey.GRU,
                titleKey: 'GRUNN_OG_HJELPESTONAD',
                allowsAnke: true,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'grunn-og-hjelpestonad',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/helse/grunn-og-hjelpestonad/NAV%2006-03.04/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/helse/grunn-og-hjelpestonad/NAV%2006-03.04/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/helse/grunn-og-hjelpestonad/NAV%2006-03.04/anke/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/helse/grunn-og-hjelpestonad/NAV%2006-03.04/anke/brev'
                }
            },
            {
                temaKey: TemaKey.YRK,
                titleKey: 'YRKESSKADE',
                allowsAnke: true,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'yrkesskade',
                mailKlageUrl: {
                    [Languages.nb]: 'https://www.nav.no/soknader/nb/person/helse/yrkesskade/NAV%2013-07.05/klage/brev',
                    [Languages.en]: 'https://www.nav.no/soknader/en/person/helse/yrkesskade/NAV%2013-07.05/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]: 'https://www.nav.no/soknader/nb/person/helse/yrkesskade/NAV%2013-07.05/anke/brev',
                    [Languages.en]: 'https://www.nav.no/soknader/en/person/helse/yrkesskade/NAV%2013-07.05/anke/brev'
                }
            }
        ]
    },
    {
        title: { [Languages.nb]: 'Familie', [Languages.en]: 'Family' },
        path: 'familie',
        beskrivelse: {
            [Languages.nb]: 'Foreldrepenger, pleie- og omsorgspenger',
            [Languages.en]: 'Parental benefit (foreldrepenger), care (omsorg) and attendance (pleie)'
        },
        kategorier: [
            {
                temaKey: TemaKey.FOR,
                titleKey: 'FORELDREPENGER_GENERELL',
                allowsAnke: true,
                digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
                digitalKlageFullmakt: false,
                path: 'foreldrepenger',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/familie/foreldrepenger-og-engangsstonad/NAV%2014-05.09/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/familie/foreldrepenger-og-engangsstonad/NAV%2014-05.09/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/familie/foreldrepenger-og-engangsstonad/NAV%2014-05.09/anke/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/familie/foreldrepenger-og-engangsstonad/NAV%2014-05.09/anke/brev'
                }
            },
            {
                temaKey: TemaKey.KON,
                titleKey: 'KONTANTSTOTTE',
                allowsAnke: false,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'kontantstotte',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/familie/kontantstotte/NAV%2034-00.08/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/familie/kontantstotte/NAV%2034-00.08/klage/brev'
                }
            },
            {
                temaKey: TemaKey.BAR,
                titleKey: 'BARNETRYGD',
                allowsAnke: true,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'barnetrygd',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/familie/barnetrygd/NAV%2033-00.07/klage/brev',
                    [Languages.en]: 'https://www.nav.no/soknader/en/person/familie/barnetrygd/NAV%2033-00.07/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]: 'https://www.nav.no/soknader/nb/person/familie/barnetrygd/NAV%2033-00.07/anke/brev',
                    [Languages.en]: 'https://www.nav.no/soknader/en/person/familie/barnetrygd/NAV%2033-00.07/anke/brev'
                }
            },
            {
                temaKey: TemaKey.BID,
                titleKey: 'BARNEBIDRAG_OG_BIDRAGSFORSKUDD',
                allowsAnke: false,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'barnebidrag-og-bidragsforskudd',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/familie/barnebidrag-og-bidragsforskudd/NAV%2055-00.60/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/familie/barnebidrag-og-bidragsforskudd/NAV%2055-00.60/klage/brev'
                }
            },
            {
                temaKey: TemaKey.BID,
                titleKey: 'EKTEFELLEBIDRAG',
                allowsAnke: false,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'ektefellebidrag',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/familie/ektefellebidrag/NAV%2053-00.05/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/familie/ektefellebidrag/NAV%2053-00.05/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/familie/ektefellebidrag/NAV%2053-00.05/anke/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/familie/ektefellebidrag/NAV%2053-00.05/anke/brev'
                }
            },
            {
                temaKey: TemaKey.ENF,
                titleKey: 'ENSLIG_MOR_ELLER_FAR',
                allowsAnke: true,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'enslig-mor-eller-far',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/familie/enslig-mor-eller-far/NAV%2015-00.01/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/familie/enslig-mor-eller-far/NAV%2015-00.01/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/familie/enslig-mor-eller-far/NAV%2015-00.01/anke/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/familie/enslig-mor-eller-far/NAV%2015-00.01/anke/brev'
                }
            },
            {
                temaKey: TemaKey.GRA,
                titleKey: 'GRAVFERDSSTONAD',
                allowsAnke: true,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'gravferdsstonad',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/stonader-ved-dodsfall/gravferdsstonad-og-baretransport/NAV%2007-02.08/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/stonader-ved-dodsfall/gravferdsstonad-og-baretransport/NAV%2007-02.08/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/stonader-ved-dodsfall/gravferdsstonad-og-baretransport/NAV%2007-02.08/anke/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/stonader-ved-dodsfall/gravferdsstonad-og-baretransport/NAV%2007-02.08/anke/brev'
                }
            },
            {
                temaKey: TemaKey.OMS,
                titleKey: 'SYKDOM_I_FAMILIEN',
                allowsAnke: true,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'sykdom-i-familien',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/familie/omsorgspenger/NAV%2009-06.07/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/familie/omsorgspenger/NAV%2009-06.07/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/familie/omsorgspenger/NAV%2009-06.07/anke/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/familie/omsorgspenger/NAV%2009-06.07/anke/brev'
                }
            },
            {
                temaKey: TemaKey.BID,
                titleKey: 'OPPFOSTRINGSBIDRAG',
                allowsAnke: false,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'oppfostringsbidrag',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/familie/oppfostringsbidrag/NAV%2057-00.08/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/familie/oppfostringsbidrag/NAV%2057-00.08/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/familie/oppfostringsbidrag/NAV%2057-00.08/anke/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/familie/oppfostringsbidrag/NAV%2057-00.08/anke/brev'
                }
            }
        ]
    },
    {
        title: { [Languages.nb]: 'Pensjon', [Languages.en]: 'Pension' },
        path: 'pensjon',
        beskrivelse: {
            [Languages.nb]: 'Alderspensjon og andre typer pensjon',
            [Languages.en]: 'Old-age pension (alderspensjon) and other types of pensions'
        },
        kategorier: [
            {
                temaKey: TemaKey.PEN,
                titleKey: 'ALDERSPENSJON',
                allowsAnke: true,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'alderspensjon',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/pensjon/alderspensjon-og-avtalefestet-pensjon/NAV%2019-01.05/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/pensjon/alderspensjon-og-avtalefestet-pensjon/NAV%2019-01.05/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/pensjon/alderspensjon-og-avtalefestet-pensjon/NAV%2019-01.05/anke/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/pensjon/alderspensjon-og-avtalefestet-pensjon/NAV%2019-01.05/anke/brev'
                }
            },
            {
                temaKey: TemaKey.PEN,
                titleKey: 'AVTALEFESTET_PENSJON',
                allowsAnke: true,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'avtalefestet-pensjon',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/pensjon/avtalefestet-pensjon-fra-statens-pensjonskasse/NAV%2062-00.16/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/pensjon/avtalefestet-pensjon-fra-statens-pensjonskasse/NAV%2062-00.16/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/pensjon/avtalefestet-pensjon-fra-statens-pensjonskasse/NAV%2062-00.16/anke/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/pensjon/avtalefestet-pensjon-fra-statens-pensjonskasse/NAV%2062-00.16/anke/brev'
                }
            },
            {
                temaKey: TemaKey.PEN,
                titleKey: 'BARNEPENSJON',
                allowsAnke: true,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'barnepensjon',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/pensjon/barn-som-har-mistet-en-eller-flere-av-foreldrene/NAV%2018-04.01/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/pensjon/barn-som-har-mistet-en-eller-flere-av-foreldrene/NAV%2018-04.01/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/pensjon/barn-som-har-mistet-en-eller-flere-av-foreldrene/NAV%2018-04.01/anke/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/pensjon/barn-som-har-mistet-en-eller-flere-av-foreldrene/NAV%2018-04.01/anke/brev'
                }
            },
            {
                temaKey: TemaKey.PEN,
                titleKey: 'KRIGSPENSJON',
                allowsAnke: true,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'krigspensjon',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/pensjon/krigspensjon/NAV%2031-00.02/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/pensjon/krigspensjon/NAV%2031-00.02/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/pensjon/krigspensjon/NAV%2031-00.02/anke/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/pensjon/krigspensjon/NAV%2031-00.02/anke/brev'
                }
            },
            {
                temaKey: TemaKey.PEN,
                titleKey: 'GJENLEVENDE',
                allowsAnke: true,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'gjenlevende',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/pensjon/gjenlevende-ektefelle-partner-eller-samboer/NAV%2017-01.05/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/pensjon/gjenlevende-ektefelle-partner-eller-samboer/NAV%2017-01.05/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/pensjon/gjenlevende-ektefelle-partner-eller-samboer/NAV%2017-01.05/anke/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/pensjon/gjenlevende-ektefelle-partner-eller-samboer/NAV%2017-01.05/anke/brev'
                }
            },
            {
                temaKey: TemaKey.SUP,
                titleKey: 'SUPPLERENDE_STONAD',
                allowsAnke: true,
                digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
                digitalKlageFullmakt: false,
                path: 'supplerende-stonad',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/pensjon/supplerende-stonad-til-personer-over-sekstisyv-ar/NAV%2064-21.00/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/pensjon/supplerende-stonad-til-personer-over-sekstisyv-ar/NAV%2064-21.00/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/pensjon/supplerende-stonad-til-personer-over-sekstisyv-ar/NAV%2064-21.00/anke/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/pensjon/supplerende-stonad-til-personer-over-sekstisyv-ar/NAV%2064-21.00/anke/brev'
                }
            },
            {
                temaKey: TemaKey.PEN,
                titleKey: 'TIDLIGERE_FAMILIEPLEIER',
                allowsAnke: true,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'tidligere-familiepleier',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/stonader-ved-dodsfall/familiepleier/NAV%2016-01.05/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/stonader-ved-dodsfall/familiepleier/NAV%2016-01.05/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/stonader-ved-dodsfall/familiepleier/NAV%2016-01.05/anke/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/stonader-ved-dodsfall/familiepleier/NAV%2016-01.05/anke/brev'
                }
            }
        ]
    },
    {
        title: { [Languages.nb]: 'Til eller fra Norge', [Languages.en]: 'To and from Norway' },
        path: 'til-eller-fra-norge',
        beskrivelse: {
            [Languages.nb]: 'Medlemskap i folketrygdloven',
            [Languages.en]: 'Membership of National Insurance Act'
        },
        kategorier: [
            {
                temaKey: TemaKey.MED,
                titleKey: 'OPPHOLD_ELLER_ARBEID_I_NORGE',
                allowsAnke: true,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'opphold-eller-arbeid-i-norge',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/til-eller-fra-norge/opphold-eller-arbeid-i-norge/NAV%2002-07.05/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/til-eller-fra-norge/opphold-eller-arbeid-i-norge/NAV%2002-07.05/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/til-eller-fra-norge/opphold-eller-arbeid-i-norge/NAV%2002-07.05/anke/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/til-eller-fra-norge/opphold-eller-arbeid-i-norge/NAV%2002-07.05/anke/brev'
                }
            },
            {
                temaKey: TemaKey.MED,
                titleKey: 'OPPHOLD_ELLER_ARBEID_UTENFOR_NORGE',
                allowsAnke: true,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'opphold-eller-arbeid-utenfor-norge',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/til-eller-fra-norge/opphold-eller-arbeid-utenfor-norge/NAV%2002-08.05/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/til-eller-fra-norge/opphold-eller-arbeid-utenfor-norge/NAV%2002-08.05/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/til-eller-fra-norge/opphold-eller-arbeid-utenfor-norge/NAV%2002-08.05/anke/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/til-eller-fra-norge/opphold-eller-arbeid-utenfor-norge/NAV%2002-08.05/anke/brev'
                }
            }
        ]
    },
    {
        title: {
            [Languages.nb]: 'Hjelpemidler og tilrettelegging',
            [Languages.en]: 'Assistive technology and facilitation'
        },
        path: 'hjelpemidler-og-tilrettelegging',
        beskrivelse: {
            [Languages.nb]: 'Hjelpemidler, tilrettelegging, bil',
            [Languages.en]: 'Assistive technology, facilitation, vehicle'
        },
        kategorier: [
            {
                temaKey: TemaKey.HJE,
                titleKey: 'HJELPEMIDLER',
                allowsAnke: true,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'hjelpemidler',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/hjelpemidler-og-tilrettelegging/diverse/NAV%2010-07.23/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/hjelpemidler-og-tilrettelegging/diverse/NAV%2010-07.23/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/hjelpemidler-og-tilrettelegging/diverse/NAV%2010-07.23/anke/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/hjelpemidler-og-tilrettelegging/diverse/NAV%2010-07.23/anke/brev'
                }
            },
            {
                temaKey: TemaKey.BIL,
                titleKey: 'BILSTONAD',
                allowsAnke: true,
                digitalKlage: [],
                digitalKlageFullmakt: false,
                path: 'bil',
                mailKlageUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/hjelpemidler-og-tilrettelegging/bil/NAV%2010-07.40/klage/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/hjelpemidler-og-tilrettelegging/bil/NAV%2010-07.40/klage/brev'
                },

                mailAnkeUrl: {
                    [Languages.nb]:
                        'https://www.nav.no/soknader/nb/person/hjelpemidler-og-tilrettelegging/bil/NAV%2010-07.40/anke/brev',
                    [Languages.en]:
                        'https://www.nav.no/soknader/en/person/hjelpemidler-og-tilrettelegging/bil/NAV%2010-07.40/anke/brev'
                }
            }
        ]
    },
    {
        title: { [Languages.nb]: 'Økonomisk sosialhjelp', [Languages.en]: 'Financial social assistance' },
        path: 'sosiale-tjenester',
        beskrivelse: {
            [Languages.nb]: '',
            [Languages.en]: ''
        },
        kategorier: [],
        externalUrl: {
            [Languages.nb]: 'https://www.nav.no/sosialhjelp/klage',
            [Languages.en]: 'https://www.nav.no/sosialhjelp/klage?lang=en'
        }
    }
];
