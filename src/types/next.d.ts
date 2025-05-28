import "next"; 
import type { Viewport as NextViewport } from "next/dist/lib/metadata/types/extra-types"; 
 
declare module "next" { 
  export interface Viewport extends NextViewport { 
    themeColor?: Array<{ 
      media: string; 
      color: string; 
    }>; 
  } 
} 
