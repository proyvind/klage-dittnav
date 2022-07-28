import { useParams } from 'react-router-dom';
import { ensureStringIsTema } from '../tema/tema';

export const useSessionTemaTitle = () => {
  const { temaKey: tema, titleKey } = useParams();
  const temaKey = ensureStringIsTema(tema ?? null);

  return { temaKey, titleKey: titleKey ?? null };
};
