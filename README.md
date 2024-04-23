Digital klage- og ankeinngang
================

Digital innsending av klager og anker. Samt ettersendelse.

# Komme i gang

```
npm i
npm start
```

## Miljøer

- `DEV`: https://klage.intern.dev.nav.no
- `PROD`: https://klage.nav.no

## Autentisering for lokal utvikling

1. Gå til https://klage.intern.dev.nav.no/nb/klage/DAGPENGER.
2. Logg inn normalt med en testbruker.
3. Endre domene til `localhost` for følgende cookies: `innloggingsstatus-token` og `io.nais.wonderwall.session`.

> Det finnes ingen landingsside for denne applikasjonen, man må selv navigere til en gyldig URL for et skjema.

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub.

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen [#team-digital-klage](https://nav-it.slack.com/archives/C01L59AQVQA).


Bruk og integrasjon
===================

## Hvordan kommer bruker seg til skjema for klage, anke og ettersendelse?

Bruker må bli sendt direkte til ett av skjemaene fra en annen tjeneste.
Andre tjenester kan f.eks. lenke til skjema for klage med følgende URL `https://klage.nav.no/nb/klage/DAGPENGER?saksnummer=12345`.

### Direkte lenke

Brukere kan være logget inn i en tjeneste som har nødvendig informasjon for å sende brukeren direkte til skjemaet, f.eks. en vedtaksløsning (selvbetjeningsløsning).

1. Bruker ser vedtak i selvbetjeningsløsning.
2. Bruker trykker på knappen `Klag på vedtak`.
3. Bruker sendes til klageskjema.

For å lenke direkte til klageskjemaet må `innsendingsytelse` være satt i URL-en.

### Saksnummer
`saksnummer` er valgfritt og kan settes som et query parameter i URL-en.
Saksnummeret settes i klagen/anken, men bruker kan **ikke** endre det.
Dersom dette ikke er oppgitt som query parameter, får bruker mulighet til å fylle inn saksnummer selv.

### Eksempel på fullstendig URL til klageskjema:
```
https://klage.nav.no/nb/klage/DAGPENGER?saksnummer=12345
```

## URL-format
```
https://klage.nav.no/{språk}/{type}/{innsendingsytelse}?saksnummer={saksnummer}
```
- `språk` = `nb | en`
- `type` = `klage | anke | ettersendelse`
- `innsendingsytelse` = Se liste over tilgjengelige ytelser under.
- `saksnummer` = Relevant saksnummer.

### Tilgjengelige ytelser
| Key   | Bokmål                                                                 | Engelsk | Nynorsk |
|-------|------------------------------------------------------------------------|---------|---------|
| ALDERSPENSJON | Alderspensjon | Retirement pension | Alderspensjon | 
| ARBEIDSAVKLARINGSPENGER | Arbeidsavklaringspenger (AAP) | Work assessment allowance (AAP) | Arbeidsavklaringspengar (AAP) | 
| AVTALEFESTET_PENSJON_SPK | Avtalefestet pensjon (AFP) fra Statens pensjonskasse | Contractual early retirement pension (AFP) in the public sector | Avtalefesta pensjon (AFP) frå Statens pensjonskasse | 
| AVTALEFESTET_PENSJON_PRIVAT | Avtalefestet pensjon (AFP) i privat sektor | Contractual early retirement pension (AFP) in the private sector | Avtalefesta pensjon (AFP) i privat sektor | 
| BARNEBIDRAG | Barnebidrag | Child support (Barnebidrag) | Barnebidrag |
| BARNEBIDRAG_OG_BIDRAGSFORSKUDD | Barnebidrag og bidragsforskudd | Child support (Barnebidrag) and advance payments of child support (Bidragsforskudd) | Barnebidrag og bidragsforskot | 
| BARNEPENSJON | Barnepensjon | Children's pension (Barnepensjon) | Barnepensjon | 
| BARNETRYGD | Barnetrygd | Child benefit (Barnetrygd) | Barnetrygd | 
| BIDRAGSFORSKUDD | Bidragsforskudd | Advance payments of child support (Bidragsforskudd) | Bidragsforskot | 
| BIDRAG_TIL_SARLIGE_UTGIFTER | Bidrag til særlige utgifter | Support for extraordinary expenses | Bidrag til særlege utgifter | 
| BILSTONAD | Bilstønad | Car benefit | Bilstønad | 
| DAGPENGER | Dagpenger | Unemployment benefits (Dagpenger) | Dagpengar | 
| DAGPENGER_TILBAKEBETALING_FORSKUDD | Tilbakebetaling av forskudd på dagpenger | Repayment of advance payment of unemployment benefits (Tilbakebetaling av forskudd på dagpenger) | Tilbakebetaling av forskot på dagpengar | 
| EKTEFELLEBIDRAG | Ektefellebidrag | Spousal support (Ektefellebidrag) | Ektefellebidrag | 
| ENGANGSSTONAD | Engangsstønad | Lump-sum grant (Engangsstønad) | Eingongsstønad | 
| ENSLIG_MOR_ELLER_FAR | Enslig mor eller far | Single mother or father | Einsleg mor eller far | 
| FORELDREPENGER | Foreldrepenger | Parental benefit (Foreldrepenger) | Foreldrepengar | 
| FORHOYET_HJELPESTONAD | Forhøyet hjelpestønad | Higher rate assistance allowance | Auka hjelpestønad | 
| FORSIKRING_FOR_FRILANSERE | Forsikring for frilansere | Insurance for freelancers | Forsikring for frilansarar | 
| FORSIKRING_FOR_JORDBRUKERE_OG_REINDRIFTSUTOVERE | Forsikring for jordbrukere og reindriftsutøvere | Insurance for farmers and reindeer herders | Forsikring for jordbrukarar og reindriftsutøvarar | 
| FORSIKRING_FOR_SELVSTENDIG_NARINGSDRIVENDE | Forsikring for selvstendig næringsdrivende | Insurance for the self-employed | Forsikring for sjølvstendig næringsdrivande | 
| FRIVILLIG_MEDLEMSKAP_I_FOLKETRYGDEN_UNDER_OPPHOLD_I_NORGE | Frivillig medlemskap i folketrygden under opphold i Norge | Voluntary membership of the Norwegian National Insurance Scheme during stay in Norway | Frivillig medlemskap i folketrygda under opphald i Noreg |
| FRIVILLIG_YRKESSKADETRYGD | Frivillig yrkesskadetrygd | Voluntary occupational injury benefit | Frivillig yrkesskadetrygd | 
| FUNKSJONSASSISTANSE_I_ARBEIDSLIVET | Funksjonsassistanse i arbeidslivet | Functional assistance in the workplace | Funksjonsassistanse i arbeidslivet | 
| FORERHUND | Førerhund | Guide dog | Førarhund | 
| GJENLEVENDE | Gjenlevendepensjon | Survivor's pension | Attlevandepensjon | 
| GRAVFERDSSTONAD | Gravferdsstønad | Funeral grant (Gravferdsstønad) | Gravferdsstønad | 
| GRUNNSTONAD | Grunnstønad | Basic benefit (Grunnstønad) | Grunnstønad |
| GRUNN_OG_HJELPESTONAD | Grunnstønad og hjelpestønad | Basic benefit (Grunnstønad) and attendance benefit (Hjelpestønad) | Grunnstønad og hjelpestønad | 
| GRONT_ARBEID | Grønt arbeid | Green work | Grønt arbeid | 
| HJELPEMIDLER | Hjelpemidler og tilrettelegging ved nedsatt funksjonsevne | Assistive technology and facilitation for impaired functional ability | Hjelpemiddel og tilrettelegging ved nedsatt funksjonsevne | 
| HJELPESTONAD | Hjelpestønad | Attendance benefit (Hjelpestønad) | Hjelpestønad | 
| JOBBKLUBB | Jobbklubb | Job club | Jobbklubb |
| JOBBMESTRENDE_OPPFOLGING | Jobbmestrende oppfølging | Work proficiency follow-up | Jobbmeistrande oppfølging |
| KONTANTSTOTTE | Kontantstøtte | Cash-for-care benefit (Kontantstøtte) | Kontantstøtte |
| KRIGSPENSJON | Krigspensjon | War pension (Krigspensjon) | Krigspensjon | 
| LESE_OG_SEKRETARHJELP | Lese- og sekretærhjelp | Reading and secretarial assistance | Lese- og sekretærhjelp | 
| LONNSGARANTI | Lønnsgaranti | Wage guarantee | Lønsgaranti | 
| LONNSKOMPENSASJON | Lønnskompensasjon for permitterte | Salary compensation for persons who are laid-off | Lønskompensasjon for permitterte | 
| MEDLEMSKAP_I_FOLKETRYGDEN_UNDER_OPPHOLD_I_EOS_ELLER_SVEITS | Medlemskap i folketrygden under opphold i EØS eller Sveits | Membership in the national insurance during stay in the EEA or Switzerland | Medlemskap i folketrygda under opphald i EØS eller Sveits | 
| MEDLEMSKAP_I_FOLKETRYGDEN_UNDER_OPPHOLD_UTENFOR_EOS | Medlemskap i folketrygden under opphold utenfor EØS | Membership in the Norwegian National Insurance Scheme while staying in a country outside EEA or Switzerland | Medlemskap i folketrygda under opphald utanfor EØS | 
| MENERSTATNING_VED_YRKESSKADE_ELLER_YRKESSYKDOM | Menerstatning ved yrkesskade eller yrkessykdom | Permanent impairment compensation in the event of an occupational injury or illness | Meinerstatning ved yrkesskade eller yrkessjukdom |
| MIDLERTIDIG_KOMPENSASJON | Midlertidig kompensasjon for selvstendig næringsdrivende og frilansere | Temporary compensation for self-employed and freelancers | Midlertidig kompensasjon for sjølvstendig næringsdrivande og frilansarar | 
| MINSTEPENSJON_I_ALDERSPENSJONEN | Minstepensjon i alderspensjonen | Minimum pension: minimum pension level and guaranteed pension | Minstepensjon i alderspensjonen | 
| NAV_LOVEN_14A | Vurdering av behov for bistand etter NAV-loven § 14 a | Assessment of need for assistance according to Section 14 a of the NAV Act | Vurdering av behov for bistand etter NAV-lova § 14 a | 
| OMSORGSPENGER_HJEMME_MED_SYKT_BARN_DAGER | Omsorgspenger (hjemme med sykt barn-dager) | Care benefit (at home with a sick child days) | Omsorgspengar (heime med sjukt barn-dagar) | 
| OMSTILLINGSSTONAD | Omstillingsstønad | Adjustment allowance (Omstillingsstønad) | Omstillingsstønad | 
| OPPFOSTRINGSBIDRAG | Oppfostringsbidrag | Upbringing support (Oppfostringsbidrag) | Oppfostringsbidrag | 
| OPPFOLGING | Oppfølging | Follow up | Oppfølging | 
| OPPLARINGSPENGER | Opplæringspenger | Training allowance | Opplæringspengar | 
| OPPHOLD_ELLER_ARBEID_I_NORGE | Opphold eller arbeid i Norge | Residence or work in Norway | Opphald eller arbeid i Noreg |
| OPPHOLD_ELLER_ARBEID_UTENFOR_NORGE | Opphold eller arbeid utenfor Norge | Residence or work outside Norway | Opphald eller arbeid utanfor Noreg | 
| OVERGANGSSTONAD_TIL_ENSLIG_MOR_ELLER_FAR | Overgangsstønad til enslig mor eller far | Transitional benefit for single parents | Overgangsstønad til einslig mor eller far | 
| OVERGANGSSTONAD_TIL_GJENLEVENDE | Overgangsstønad til gjenlevende | Transitional benefit for survivors | Overgangsstønad til attlevande | 
| PENSJONSOPPTJENING_VED_OMSORG_FOR_BARN | Pensjonsopptjening ved omsorg for barn | Accumulation of pension rights for care work for children | Pensjonsopptening ved omsorg for barn | 
| PENSJONSOPPTJENING_VED_OMSORG_FOR_SYKE_ELDRE_OG_PERSONER_MED_FUNKSJONSNEDSETTELSER | Pensjonsopptjening ved omsorg for syke, eldre og personer med funksjonsnedsettelser | Accumulation of pension rights for care work for sick, disabled or elderly people | Pensjonsopptening ved omsorg for sjuke, eldre og personar med nedsett funksjon | 
| PLEIEPENGER_FOR_EN_UTVIKLINGSHEMMET_PERSON_OVER_18_AR | Pleiepenger for en utviklingshemmet person over 18 år | Attendance allowance for developmentally disabled person over 18 | Pleiepengar for ein utviklingshemma person over 18 år | 
| PLEIEPENGER_FOR_SYKT_BARN | Pleiepenger for sykt barn | Attendance allowance for sick children | Pleiepengar for sjukt barn | 
| PLEIEPENGER_I_LIVETS_SLUTTFASE | Pleiepenger i livets sluttfase | Attendance allowance in the final phase of life | Pleiepengar i sluttfasen av livet |
| REISEKOSTNADER_VED_SAMVAER | Reisekostnader ved samvær | Travel costs for visits | Reisekostnader ved samvær | 
| REISEKOSTNADER_VED_SAMVAR | Reisekostnader ved samvær | Travel costs for visits | Reisekostnader ved samvær | 
| REISETILSKUDD | Reisetilskudd | Travel allowance | Reisetilskot | 
| REISEUTGIFTER | Reiseutgifter | Travel expenses | Reiseutgifter | 
| SERVICEHUND | Servicehund | Service dog | Servicehund | 
| STUDIER_MED_STOTTE | Studier med støtte | Studies with support (support to finish school) | Studiar med støtte | 
| STONAD_TIL_BARNETILSYN_FOR_ENSLIG_MOR_ELLER_FAR | Stønad til barnetilsyn for enslig mor eller far | Child care benefit for single parents | Stønad til barnetilsyn for einsleg mor eller far | 
| STONAD_TIL_BARNETILSYN_FOR_GJENLEVENDE_EKTEFELLE | Stønad til barnetilsyn for gjenlevende ektefelle | Child care benefits for surviving spouse | Stønad til barnetilsyn for attlevande ektefelle | 
| STONAD_TIL_SKOLEPENGER_FOR_ENSLIG_MOR_ELLER_FAR | Stønad til skolepenger for enslig mor eller far | Allowance to cover tuition and fees for single parents | Stønad til skulepengar for einsleg mor eller far | 
| STONAD_TIL_SKOLEPENGER_FOR_GJENLEVENDE_EKTEFELLE | Stønad til skolepenger for gjenlevende ektefelle | Allowance to cover tuition and fees for survivors | Stønad til skulepengar for attlevande ektefelle | 
| STONAD_TIL_SKOLEPENGER_FOR_TIDLIGERE_FAMILIEPLEIERE | Stønad til skolepenger for tidligere familiepleiere | Allowance to cover tuition and fees for former family caregivers | Stønad til skulepengar for tidlegare familiepleiarar | 
| STONAD_VED_BARETRANSPORT | Stønad ved båretransport | Allowance for transportation of the deceased | Stønad ved båretransport | 
| STOTTE_TIL_ARBEIDS_OG_UTDANNINGSREISER | Støtte til arbeids- og utdanningsreiser | Work and education travel grant | Støtte til arbeids- og utdanningsreiser |
| STOTTE_TIL_FOLKEHOYSKOLE | Støtte til folkehøyskole | Folk high school grant | Støtte til folkehøgskule |
| SUPPLERENDE_STONAD | Supplerende stønad til personer over 67 år med kort botid i Norge | Supplementary benefit for persons over 67 who have only lived a short period of time in Norway | Supplerande stønad til personar over 67 år med kort butid i Noreg | 
| SUPPLERENDE_STONAD_UFORE_FLYKTNINGER | Supplerende stønad for uføre flyktninger under 67 år | Supplementary benefit for disabled refugees under the age of 67 | Supplerande stønad for uføre flyktningar under 67 år | 
| SVANGERSKAPSPENGER | Svangerskapspenger | Pregnancy benefit (Svangerskapspenger) | Svangerskapspengar |
| SYKDOM_I_FAMILIEN | Omsorgspenger, opplæringspenger, pleiepenger | Care benefit (Omsorgspenger), training allowance (Opplæringspenger), attendance allowance (Pleiepenger) | Omsorgspengar, opplæringspengar, pleiepengar | 
| SYKEPENGER | Sykepenger | Sickness benefit (Sykepenger) | Sjukepengar |
| TIDLIGERE_FAMILIEPLEIER | Ytelser til tidligere familiepleier | Benefits to former family caregivers | Ytingar til tidlegare familiepleiarar | 
| TILLEGGSSTONADER | Tilleggsstønader | Supplemental benefits | Tilleggsstønader | 
| TILLEGGSSTONADER_TIL_ENSLIG_MOR_ELLER_FAR | Tilleggsstønader til enslig mor eller far | Supplemental benefit for single parents | Tilleggsstønader til einsleg mor eller far | 
| TILLEGGSSTONADER_TIL_GJENLEVENDE_EKTEFELLE | Tilleggsstønader til gjenlevende ektefelle | Supplemental benefit for surviving spouse | Tilleggsstønader til attlevande ektefelle | 
| TILLEGGSSTONADER_TIL_TIDLIGERE_FAMILIEPLEIER | Tilleggsstønader til tidligere familiepleier | Supplemental benefit for former family caregivers | Tilleggsstønader til tidlegare familiepleiarar | 
| TILPASNINGSKURS_NEDSATT_SYN_OG_HORSEL | Tilpasningskurs - nedsatt syn og hørsel | Adaption course - impaired vision and hearing | Tilpassingskurs - nedsett syn og høyrsel | 
| TILSKUDD_TIL_APPER_OG_PROGRAMVARE | Tilskudd til apper og programvare | App and software grants | Tilskot til appar og programvare | 
| TILSKUDD_TIL_BIL | Tilskudd til bil | Car grants | Tilskot til bil | 
| TILSKUDD_TIL_KJOP_AV_PC_ELLER_NETTBRETT | Tilskudd til kjøp av PC eller nettbrett ved lese- og skrivevansker | Grants for the purchase of a PC or tablet in case of reading and writing difficulties | Tilskot til kjøp av PC eller nettbrett ved lese- og skrivevanskar | 
| TILSKUDD_TIL_OMBYGGING | Tilskudd til ombygging | Rebuilding grant | Tilskot til ombygging | 
| TILSKUDD_TIL_RIMELIGE_HJELPEMIDLER | Tilskudd til rimelige hjelpemidler | Affordable assistive technology grant | Tilskot til rimelege hjelpemiddel | 
| TILTAKSPENGER | Tiltakspenger | Employment scheme benefits | Tiltakspengar | 
| TOLKING_FOR_DOVE_DOVBLINDE_OG_HORSELSHEMMEDE | Tolking for døve, døvblinde og hørselshemmede | Interpretation for deaf, deafblind and individuals with impaired hearing | Tolking for døve, døvblinde og høyrselshemma | 
| UFORETRYGD | Uføretrygd | Disability benefit (Uføretrygd) | Uføretrygd | 
| UTVIDET_BARNETRYGD | Utvidet barnetrygd | Extended child benefit | Utvida barnetrygd | 
| YRKESSKADE | Yrkesskade eller yrkessykdom | Occupational injury or occupational disease | Yrkesskade eller yrkessjukdom | 
| YTELSER_TIL_TIDLIGERE_FAMILIEPLEIERE | Ytelser til tidligere familiepleiere | Benefit for former family caregivers | Ytingar til tidlegare familiepleiarar |

## Legge til ny ytelse

Om ingen av ytelse som støttes passer deres behov er det mulig å opprette en PR i [klage-dittnav-api](https://github.com/navikt/klage-dittnav-api)-prosjektet eller kontakte teamet på Slack i kanalen [#team-digital-klage](https://nav-it.slack.com/archives/C01L59AQVQA).

> Merk at alle ytelser må legges inn på norsk og engelsk.

## Fortsette på påbegynt klage/anke

Når brukere oppretter klager/anker ved å gå til skjemaet, men ikke sender inn, blir de liggende som påbegynte klager/anker.

Dersom en bruker går til skjemaet med samme parametere igjen senere, vil bruker fortsette på den uferdige klagen/anken.

## Permanente lenker til skjemaer

Alle klager/anker blir opprettet med en unik ID som vises i URL-en. Dvs. at en bruker kan ta vare på lenken til en spesifikk klage/anke og bruke den senere.

Klager/anker som ikke er sendt inn vil kunne redigeres og sendes inn.

Klager/anker som er sendt inn vil kun vise en oppsummering og lenke til innsendt klage/anke som PDF.

> Vedlegg vil være en del av PDFen og ikke eksistere som frittstående filer etter klagen er innsendt.

## Fullmakt

> Under utvikling. Ikke bruk.

Det er også støtte for å oppgi fullmaktsgiver i URLen med query-parameteret `fullmaktsgiver` sammen med de andre parameterne.

Dette parameteret må være fødselsnummeret til personen som har gitt fullmakten til brukeren som skal sende inn klagen (fullmaktsgiver).

Om fullmakten ikke er gyldig blir bruker møtt med en feilmelding. Om fullmakten er gyldig vil bruker få en tydelig infoboks gjennom hele skjemaet om at de klager på vegne av den andre.

Ved hjelp av dette parameteret kan vi i tillegg gi brukere muligheten til å klage på vegne av fullmaktsgiver gjennom et GUI.

Under visse ytelser vil inngangen for klage gi bruker muligheten til å trykke på en knapp "Klage på vegne av andre" som tar bruker til en skjerm der de kan skrive inn fødselsnummer. Når de trykker søk vil systemet enten:

1. Bekrefte at bruker har fullmakt fra person med oppgitt fødselsnummer. Da kan bruker gå videre til skjemaet der `fullmaktsgiver`-queryen automatisk blir satt til oppgitt fødselsnummer.
2. Ikke bekrefte og gi bruker en feilmelding. Ingen informasjon rundt oppgitt fødselsnummer blir vist til bruker.

## Videre flyt

Denne klienten interagerer med https://github.com/navikt/klage-dittnav-api, som igjen sender info videre til https://github.com/navikt/klage-arkiver-journalpost. Se `README` i sistnevnte for informasjon om hvordan journalposter opprettes i Joark.
