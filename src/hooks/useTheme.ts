import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (document.cookie.match(/theme=(light|dark)/) || ['', 'light'])[1] as Theme;
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const html = document.querySelector('html');
    if (theme === 'dark') {
      html?.classList.remove('light'); 
      html?.classList.add('dark');
    } else {
      html?.classList.remove('dark');
      html?.classList.add('light');
    }
    document.cookie = `theme=${theme}; path=/; max-age=31536000`; // Cookie válido por 1 ano
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Não renderiza nada até o componente estar montado no cliente
  if (!mounted) {
    return { theme: 'light', toggleTheme: () => {} };
  }

  return { theme, toggleTheme };
}