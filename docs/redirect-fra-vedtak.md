# Redirect fra vedtaksløsning (selvbetjeningsløsning)
Når klageskjemaet settes opp så ser vi for oss at det er to inngangsporter til klageskjemaet:

1. Navigering på nav.no
2. Redirect fra en selvbetjeningsløsning

Dette dokumentet tar for seg punkt **2**, altså redirect fra en selvbetjeningsløsning.

## Beskrivelse av scenario
Etterhvert som ytelsene blir modernisert vil de også få en selvbetjeningsløsning, det vil si en 
løsning for brukerne der de kan få innsyn i vedtak gjort. Det er fra et slikt innsynsbilde vi ser
for oss at brukeren skal få direkte tilgang til klageskjema. Vi kan beskrive det som følger:

1. Bruker ser vedtak i selvbetjeningsløsning
2. Bruker får en knapp **klag på vedtak**
3. Bruker redirectes til klageskjema med ferdigutfylt informasjon om vedtak

## Teknisk beskrivelse
Siden bruker allerede er logget inn, er det ikke behov for å sende med brukerdata,
men det er ønskelig at det sendes med følgende felter:
* Vedtaksdato
* Saksreferanse
* Tema
* Enhet

```
<URL>?vedtaksdato=2020-01-31&referanse=saksreferanse&tema=FP&enhet=2990
```

## URL
* labs: https://klage-dittnav.labs.nais.io
* preprod: https://klage-dittnav.dev-nav.no
* prod: N/A
