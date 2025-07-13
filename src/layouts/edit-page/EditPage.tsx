import React from "react";
import { View, StyleSheet } from "react-native";
import { EditForm } from "@/src/features/user/components/EditForm";
import { ResponsiveContainer } from "@/src/shared/ui/responsive-container/ResponsiveContainer";
import { useResponsiveStyles } from "@/src/shared/lib/responsive/responsiveStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export const EditPage = () => {
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
          <EditForm />
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
  },
  form: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  desktopForm: {
    maxWidth: 400,
    paddingTop: 40,
  },
}); 