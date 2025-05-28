import type { Attribute } from "next-themes/dist/types"; 
 
declare module "@/components/theme-provider" { 
  export interface ThemeProviderProps { 
    children: React.ReactNode; 
    attribute?: Attribute; 
    defaultTheme?: string; 
    enableSystem?: boolean; 
    disableTransitionOnChange?: boolean; 
  } 
} 
