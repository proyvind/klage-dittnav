import { useEffect } from 'react';

export const usePageInit = (title: string) => {
  useEffect(() => {
    document.title = title;
    window.scrollTo(0, 0);
  }, [title]);
};
