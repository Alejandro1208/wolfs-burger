import React, { useEffect } from 'react';
import { useData } from '../../contexts/DataContext';

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : null;
};

const ThemeManager = () => {
  const { siteSettings } = useData();

  useEffect(() => {
    const root = document.documentElement;
    if (siteSettings) {
      root.style.setProperty('--color-primary', hexToRgb(siteSettings.color_primary || '#0d1e3d'));
      root.style.setProperty('--color-secondary', hexToRgb(siteSettings.color_secondary || '#226ea5'));
      root.style.setProperty('--color-accent', hexToRgb(siteSettings.color_accent || '#e68e24'));
    }
    document.body.style.opacity = 1;
  }, [siteSettings]);

  return null;
};

export default ThemeManager;