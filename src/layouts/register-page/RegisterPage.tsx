import React from "react";
import { View, StyleSheet } from "react-native";
import { RegisterForm } from "@/src/features/auth/components/RegisterForm";
import { ResponsiveContainer } from "@/src/shared/ui/responsive-container/ResponsiveContainer";
import { useResponsiveStyles } from "@/src/shared/lib/responsive/responsiveStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export const RegisterPage = () => {
  const { isDesktop, dimensions, breakpoints } = useResponsiveStyles();
  const containerMaxWidth = isDesktop ? 960 : 1200;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ResponsiveContainer style={
        isDesktop 
          ? { ...styles.responsiveContainer, maxWidth: containerMaxWidth }
          : styles.responsiveContainer
      }>
        <View style={[styles.form, isDesktop && styles.desktopForm]}>
          <RegisterForm />
        </View>
      </ResponsiveContainer>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  responsiveContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  form: {
    width: '100%',
    padding: 20,
  },
  desktopForm: {
    width: 400,
  },
});

