import { Platform, ScaledSize, StyleSheet, useWindowDimensions } from "react-native";

export type Breakpoints = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export const breakpoints: Breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export type ResponsiveStyleValue<T> = {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

export const useResponsiveStyles = () => {
  const dimensions = useWindowDimensions();
  
  const isWeb = Platform.OS === 'web';
  const isMobile = !isWeb;
  const isDesktop = isWeb && dimensions.width >= breakpoints.sm;
  const isTablet = isWeb && dimensions.width >= breakpoints.sm && dimensions.width < breakpoints.md;

  
  const createStyles = <T extends StyleSheet.NamedStyles<T>>(
    styles: T | StyleSheet.NamedStyles<T>
  ) => StyleSheet.create(styles);
  
  const getResponsiveValue = <T>(values: ResponsiveStyleValue<T>): T => {
    const { width } = dimensions;
    
    if (width >= breakpoints.xl && values.xl !== undefined) {
      return values.xl;
    }
    
    if (width >= breakpoints.lg && values.lg !== undefined) {
      return values.lg;
    }
    
    if (width >= breakpoints.md && values.md !== undefined) {
      return values.md;
    }
    
    if (width >= breakpoints.sm && values.sm !== undefined) {
      return values.sm;
    }
    
    return values.base;
  };
  
  return {
    breakpoints,
    dimensions,
    isWeb,
    isMobile,
    isDesktop,
    isTablet,
    createStyles,
    getResponsiveValue,
  };
}; 