import { useEffect, useState } from 'react';
import { getTheme } from '../style/theme';

export const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia(getTheme('light').mediaquery.mobile).matches
  );

  useEffect(() => {
    const mediaquery = window.matchMedia('(max-width:768px)');
    setIsMobile(mediaquery.matches);
  }, []);

  return { isMobile };
};
