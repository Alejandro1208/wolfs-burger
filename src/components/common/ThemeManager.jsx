import { useEffect } from 'react';
import { useData } from '../../contexts/DataContext';

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : null;
};

const ThemeManager = () => {
  const { siteSettings } = useData();

  useEffect(() => {
    const root = document.documentElement;
    if (siteSettings.color_primary) {
      root.style.setProperty('--color-primary', hexToRgb(siteSettings.color_primary));
    }
    if (siteSettings.color_secondary) {
      root.style.setProperty('--color-secondary', hexToRgb(siteSettings.color_secondary));
    }
    if (siteSettings.color_accent) {
      root.style.setProperty('--color-accent', hexToRgb(siteSettings.color_accent));
    }
    document.body.style.opacity = 1;
  }, [siteSettings]);

  return null; // Este componente no renderiza nada
};

export default ThemeManager;