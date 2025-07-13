import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import LoginForm from "@/src/features/auth/components/LoginForm";


export const LoginPageDesktop = () => {
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <LoginForm />
      </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: '100%',
  },
  form: {
    width: 400,
  },
});

export default LoginPageDesktop;
