export type ColorScheme = 'light' | 'dark' | 'system';
export type ColorVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'info';
export type ColorIntensity = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
export type BorderRadius = 'none' | 'small' | 'medium' | 'large' | 'full';
export type ThemeStyle = 'minimal' | 'classic' | 'modern' | 'neumorphic';

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

export interface ThemeFactoryProps {
  baseColor: string;
  secondaryColor?: string;
  accentColor?: string;
  colorScheme?: ColorScheme;
  borderRadius?: BorderRadius;
  style?: ThemeStyle;
  fontFamily?: string;
  customColors?: Partial<Record<ColorVariant, string>>;
}

export function createTheme(props: ThemeFactoryProps) {
  const {
    baseColor = '#00BCD4', // Default cyan
    secondaryColor = '#40E0D0', // Default turquoise
    accentColor = '#FF4081', // Default pink
    colorScheme = 'light',
    borderRadius = 'medium',
    style = 'modern',
    fontFamily = 'Inter, system-ui, sans-serif',
    customColors = {}
  } = props;
  
  // Convert hex to RGB for use in CSS variables and color manipulations
  const hexToRgb = (hex: string): [number, number, number] => {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return [r, g, b];
  };
  
  // Get brightness of a color for contrast calculation
  const getBrightness = (rgb: [number, number, number]): number => {
    return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
  };
  
  // Get contrasting foreground color (black or white)
  const getContrastingColor = (rgb: [number, number, number]): string => {
    return getBrightness(rgb) > 128 ? '#000000' : '#ffffff';
  };
  
  // Convert RGB values to CSS RGB string
  const rgbToCss = (rgb: [number, number, number]): string => {
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  };
  
  // Calculate radius value based on borderRadius setting
  const getRadiusValue = (): string => {
    switch (borderRadius) {
      case 'none': return '0px';
      case 'small': return '0.25rem';
      case 'medium': return '0.5rem';
      case 'large': return '1rem';
      case 'full': return '9999px';
      default: return '0.5rem';
    }
  };
  
  // Parse base colors to RGB
  const primaryRgb = hexToRgb(baseColor);
  const secondaryRgb = hexToRgb(secondaryColor);
  const accentRgb = hexToRgb(accentColor);
  
  // Determine color for light/dark schemes
  const isDark = colorScheme === 'dark';
  
  // Generate CSS variables for the theme
  const getCssVariables = () => {
    const variables: Record<string, string> = {
      '--font-family': fontFamily,
      '--radius': getRadiusValue(),
      
      // Apply appropriate color scheme
      '--background': isDark ? 'rgb(10, 10, 10)' : 'rgb(255, 255, 255)',
      '--foreground': isDark ? 'rgb(229, 229, 229)' : 'rgb(10, 10, 10)',
      
      '--card': isDark ? 'rgb(24, 24, 27)' : 'rgb(255, 255, 255)',
      '--card-foreground': isDark ? 'rgb(229, 229, 229)' : 'rgb(10, 10, 10)',
      
      '--popover': isDark ? 'rgb(24, 24, 27)' : 'rgb(255, 255, 255)',
      '--popover-foreground': isDark ? 'rgb(229, 229, 229)' : 'rgb(10, 10, 10)',
      
      '--muted': isDark ? 'rgb(39, 39, 42)' : 'rgb(245, 245, 245)',
      '--muted-foreground': isDark ? 'rgb(161, 161, 170)' : 'rgb(115, 115, 115)',
      
      '--border': isDark ? 'rgb(39, 39, 42)' : 'rgb(229, 229, 229)',
      '--input': isDark ? 'rgb(39, 39, 42)' : 'rgb(229, 229, 229)',
      '--ring': isDark ? rgbToCss(primaryRgb) : rgbToCss(primaryRgb),
      
      // Primary colors
      '--primary': rgbToCss(primaryRgb),
      '--primary-foreground': getContrastingColor(primaryRgb),
      
      // Secondary colors
      '--secondary': rgbToCss(secondaryRgb),
      '--secondary-foreground': getContrastingColor(secondaryRgb),
      
      // Accent colors (used for highlights)
      '--accent': rgbToCss(accentRgb),
      '--accent-foreground': getContrastingColor(accentRgb),
      
      // Destructive (error/danger) colors
      '--destructive': isDark ? 'rgb(248, 113, 113)' : 'rgb(220, 38, 38)',
      '--destructive-foreground': isDark ? 'rgb(10, 10, 10)' : 'rgb(255, 255, 255)'
    };
    
    // Add custom colors
    Object.entries(customColors).forEach(([key, value]) => {
      if (value) {
        const rgb = hexToRgb(value);
        variables[`--${key}`] = rgbToCss(rgb);
        variables[`--${key}-foreground`] = getContrastingColor(rgb);
      }
    });
    
    return variables;
  };
  
  // Generate theme JSON for ShadCN theme
  const toShadcnTheme = () => {
    return {
      primary: baseColor.replace('#', ''),
      variant: style === 'minimal' ? 'professional' : 
               style === 'classic' ? 'tint' : 
               'vibrant',
      appearance: colorScheme === 'system' ? 'system' : 
                  colorScheme === 'dark' ? 'dark' : 
                  'light',
      radius: borderRadius === 'none' ? 0 :
              borderRadius === 'small' ? 0.25 :
              borderRadius === 'medium' ? 0.5 :
              borderRadius === 'large' ? 1 :
              borderRadius === 'full' ? 9999 :
              0.5
    };
  };
  
  return {
    ...props,
    isDark,
    cssVariables: getCssVariables(),
    shadcnTheme: toShadcnTheme(),
    getContrastText: (color: string) => {
      return getContrastingColor(hexToRgb(color));
    },
    getCssVariableStyle: () => {
      const style: Record<string, string> = {};
      const variables = getCssVariables();
      
      Object.entries(variables).forEach(([key, value]) => {
        style[key] = value;
      });
      
      return style;
    },
    getColorWithOpacity: (color: ColorVariant, opacity: number) => {
      const rgb = color === 'primary' ? primaryRgb :
                  color === 'secondary' ? secondaryRgb :
                  color === 'accent' ? accentRgb :
                  primaryRgb;
                  
      return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
    },
    getTextStyle: () => {
      return {
        fontFamily,
        color: isDark ? 'rgb(229, 229, 229)' : 'rgb(10, 10, 10)'
      };
    }
  };
}