import { TemaKey } from '../types/tema';
import * as data from './klage-eller-anke-temaer.json';
export interface KategoriTema {
    tema: TemaKey;
    tittel: string;
    skjemaveileder: boolean;
    digital: boolean;
    bareAnke: boolean;
}

export interface KlageAnkeTema {
    tittel: string;
    path: string;
    beskrivelse: string;
    underkategorier: KategoriTema[];
}

export const KLAGE_ELLER_ANKE_TEMAER: KlageAnkeTema[] = JSON.parse(JSON.stringify(data.temaer));

export const getKategori = (kategori: string) => KLAGE_ELLER_ANKE_TEMAER.find(({ path }) => path === kategori) ?? null;
export const getKategoriFromTema = (temaKey: TemaKey) =>
    KLAGE_ELLER_ANKE_TEMAER.find(({ underkategorier }) => underkategorier.some(({ tema }) => tema === temaKey)) ?? null;

export const hasDigitalForm = (tema: TemaKey) =>
    KLAGE_ELLER_ANKE_TEMAER.some(({ underkategorier }) => underkategorier.some(t => t.digital && t.tema === tema));
