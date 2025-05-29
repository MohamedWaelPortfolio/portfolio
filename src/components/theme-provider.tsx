'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

type Attribute = 'class' | 'data-theme' | 'data-mode';

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: Attribute;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  themes?: string[];
  storageKey?: string;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
    // Apply the initial theme without animation
    document.documentElement.style.setProperty('--transition-duration', '0s');
    requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--transition-duration', '200ms');
    });
  }, []);
  
  if (!mounted) {
    return (
      <div style={{ visibility: 'hidden' }} aria-hidden="true" suppressHydrationWarning>
        {children}
      </div>
    );
  }

  return (
    <NextThemesProvider {...props}>
      <div 
        className="contents" 
        style={{ 
          transition: 'background-color var(--transition-duration) ease-in-out, color var(--transition-duration) ease-in-out',
          willChange: 'background-color, color'
        }}
      >
        {children}
      </div>
    </NextThemesProvider>
  );
}
