Digital klage- og ankeinngang
================

Digital innsending av klager og anker.

# Komme i gang

```
npm i
npm start
```

## Miljøer

- `DEV`: https://klage.intern.dev.nav.no
- `PROD`: https://klage.nav.no

## Autentisering for lokal utvikling

1. Gå til https://klage.intern.dev.nav.no.
2. Logg inn via `TESTID` med fnr. `05906498040`.
3. Endre domene til `localhost` for følgende cookies: `innloggingsstatus-token` og `io.nais.wonderwall.session`.

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan også stilles som issues her på GitHub.

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen [#team-digital-klage](https://nav-it.slack.com/archives/C01L59AQVQA).


Bruk og integrasjon
===================

## Hvordan kommer bruker seg til en digital klage/anke?

Det er to måter for en bruker å komme seg til en digital klage/anke på.
Enten via denne løsningens egen inngang eller sendt direkte til skjemaet fra en annen tjeneste.

### Denne løsningen sin egen inngang

Brukere kan navigere seg frem til riktig ytelse via [klage.nav.no](https://klage.nav.no).
Innlogging er ikke påkrevd, men oppfordret til.
Bruker må være logget inn for å kunne sende inn digitalt. Uten å logge inn er kun post mulig.

### Direkte lenke

Brukere kan være logget inn i en tjeneste som har nødvendig informasjon for å sende brukeren direkte til skjemaet, f.eks. en vedtaksløsning (selvbetjeningsløsning).

1. Bruker ser vedtak i selvbetjeningsløsning.
2. Bruker trykker på knappen `Klag på vedtak`.
3. Bruker sendes til klageskjema.

For å lenke direkte til klageskjemaet må `innsendingsytelse` være satt i URL-en.

#### Saksnummer
`saksnummer` er valgfritt og kan settes som et query parameter i URL-en.
Saksnummeret settes i klagen/anken, men bruker kan **ikke** endre det.
Dersom dette ikke er oppgitt som query parameter, får bruker mulighet til å fylle inn saksnummer selv.

URLen må være på følgende format:
```
https://klage.nav.no/{språk}/{type}/ny/{innsendingsytelse}?saksnummer={saksnummer}
```

Eksempler på fullstendige URL-er til klageskjema på norsk og engelsk:

```
https://klage.nav.no/nb/klage/ny/DAGPENGER?saksnummer=12345
```
```
https://klage.nav.no/en/klage/ny/DAGPENGER?saksnummer=12345
```

Eksempler på fullstendige URL-er til ankeskjema på norsk og engelsk:

```
https://klage.nav.no/nb/anke/ny/DAGPENGER?saksnummer=12345
```
```
https://klage.nav.no/en/anke/ny/DAGPENGER?saksnummer=12345
```

## Tilgjengelige ytelser
| Key   | Norsk | Engelsk |
|-------|-------|---------|
| ALDERSPENSJON | Alderspensjon | Old-age pension |
| ARBEIDSAVKLARINGSPENGER | Arbeidsavklaringspenger (AAP) | Work assessment allowance (AAP) |
| AVTALEFESTET_PENSJON_SPK | Avtalefestet pensjon (AFP) fra Statens pensjonskasse | Contractual early retirement pension (AFP) in the public sector |
| AVTALEFESTET_PENSJON_PRIVAT | Avtalefestet pensjon (AFP) i privat sektor | Contractual early retirement pension (AFP) in the private sector |
| BARNEBIDRAG_OG_BIDRAGSFORSKUDD | Barnebidrag og bidragsforskudd | Child support (Barnebidrag) and advance payments of child support (Bidragsforskudd) |
| BARNEPENSJON | Barnepensjon | Children's pension (Barnepensjon) |
| BARNETRYGD | Barnetrygd | Child benefit (Barnetrygd) |
| BILSTONAD | Stønad til bil og spesialutstyr til kjøretøy | Vehicle and special equipment for vehicles benefit |
| DAGPENGER | Dagpenger | Unemployment benefits (Dagpenger) |
| DAGPENGER_FERIEPENGER | Feriepenger av dagpenger | Holiday pay and unemployment benefits (Feriepenger av dagpenger) |
| DAGPENGER_TILBAKEBETALING_FORSKUDD | Tilbakebetaling av forskudd på dagpenger | Repayment of advance payment of unemployment benefits (Tilbakebetaling av forskudd på dagpenger) |
| EKTEFELLEBIDRAG | Ektefellebidrag | Spousal support (Ektefellebidrag) |
| ENGANGSSTONAD | Engangsstønad | Lump-sum grant (Engangsstønad) |
| ENSLIG_MOR_ELLER_FAR | Enslig mor eller far | Single mother or father |
| FORELDREPENGER | Foreldrepenger | Parental benefit (Foreldrepenger) |
| GJENLEVENDE | Pensjon til gjenlevende ektefelle eller samboer | Pension to surviving spouse or cohabitant |
| GRAVFERDSSTONAD | Gravferdsstønad | Funeral grant (Gravferdsstønad) |
| GRUNN_OG_HJELPESTONAD | Grunnstønad og hjelpestønad | Basic benefit (Grunnstønad) and attendance benefit (Hjelpestønad) |
| HJELPEMIDLER | Hjelpemidler og tilrettelegging ved nedsatt funksjonsevne | Assistive technology and facilitation for impaired functional ability |
| KONTANTSTOTTE | Kontantstøtte | Cash-for-care benefit (Kontantstøtte) |
| KRIGSPENSJON | Krigspensjon | War pension (Krigspensjon) |
| LONNSGARANTI | Lønnsgaranti ved konkurs hos arbeidsgiver | Salary guarantee upon bankruptcy of employer |
| LONNSKOMPENSASJON | Lønnskompensasjon for permitterte | Salary compensation for persons who are laid-off |
| MIDLERTIDIG_KOMPENSASJON | Midlertidig kompensasjon for selvstendig næringsdrivende og frilansere | Temporary compensation for self-employed and freelancers |
| NAV_LOVEN_14A | Vurdering av behov for bistand etter NAV-loven § 14 a | Assessment of need for assistance according to Section 14 a of the NAV Act |
| OPPFOSTRINGSBIDRAG | Oppfostringsbidrag | Upbringing support (Oppfostringsbidrag) |
| OPPHOLD_ELLER_ARBEID_I_NORGE | Opphold eller arbeid i Norge | Residence or work in Norway |
| OPPHOLD_ELLER_ARBEID_UTENFOR_NORGE | Opphold eller arbeid utenfor Norge | Residence or work outside Norway |
| SUPPLERENDE_STONAD | Supplerende stønad til personer over 67 år med kort botid i Norge | Supplementary benefit for persons over 67 who have only lived a short period of time in Norway |
| SUPPLERENDE_STONAD_UFORE_FLYKTNINGER | Supplerende stønad til uføre flyktninger | Supplementary benefit for disabled refugees |
| SVANGERSKAPSPENGER | Svangerskapspenger | Pregnancy benefit (Svangerskapspenger) |
| SYKDOM_I_FAMILIEN | Omsorgspenger, opplæringspenger, pleiepenger | Care benefit (Omsorgspenger), training allowance (Opplæringspenger), attendance allowance (Pleiepenger) |
| SYKEPENGER | Sykepenger | Sickness benefit (Sykepenger) |
| TIDLIGERE_FAMILIEPLEIER | Ytelser til tidligere familiepleier | Benefits to former family caregivers |
| TILLEGGSSTONAD | Tilleggsstønader | Supplemental benefits |
| TILTAKSPENGER | Tiltakspenger for arbeidsmarkedstiltak | Benefits (Tiltakspenger) while participating in employment schemes |
| UFORETRYGD | Uføretrygd | Disability benefit (Uføretrygd) |
| YRKESSKADE | Yrkesskade | Occupational injury (Yrkesskade) |

## Legge til ny ytelse

Om ingen av ytelse som støttes passer deres behov er det mulig å opprette en PR i `klage-dittnav-api`-prosjektet eller kontakte teamet på Slack i kanalen `#team-digital-klage`.

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
