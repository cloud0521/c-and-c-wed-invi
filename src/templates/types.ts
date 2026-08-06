export interface ThemeTokens {
  colors: {
    canvas: string;
    surface: string;
    ink: string;
    mutedInk: string;
    accent: string;
    accentSoft: string;
  };
  typography: {
    display: string;
    body: string;
    script: string;
  };
  decoration: {
    texture: 'paper' | 'none' | 'velvet';
    ornament: 'floral' | 'none' | 'filigree';
  };
}

export interface WeddingTemplate {
  id: string;
  name: string;
  description: string;
  tokens: ThemeTokens;
}
