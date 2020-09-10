Front end for klageskjema som skal legges ut på DittNAV.

## Kjøre lokalt
`npm run start`

## Kjøre med docker-compose
Kjøre med mock:
`docker-compose up`

Kjøre mot reell backend lokalt (og sørge for at du har nyeste versjon): 
 * Ha naisdevice (eller navTunnell) kjørende
 * Vær koblet mot dev-gcp
```
npm run build
docker-compose -f docker-compose.backend.yml up --build
```
