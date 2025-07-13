import React, { ReactNode } from "react";
import { View, StyleSheet, Platform, useWindowDimensions, ViewStyle } from "react-native";

interface ResponsiveContainerProps {
  children: ReactNode;
  style?: ViewStyle;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ 
  children, 
  style 
}) => {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width > 768;

  return (
    <View 
      style={[
        styles.container,
        isDesktop && styles.desktopContainer,
        style
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  desktopContainer: {
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: 24,
  }
}); 