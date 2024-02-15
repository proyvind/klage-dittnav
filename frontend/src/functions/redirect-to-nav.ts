import { ENVIRONMENT } from '@app/environment/environment';

const NAV_URL = ENVIRONMENT.isProduction ? 'https://www.nav.no/klage' : 'https://www.ekstern.dev.nav.no/klage';

export const redirectToNav = () => location.replace(NAV_URL);
