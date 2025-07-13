import React from "react";
import { LoginForm } from "@/src/features/auth/components/LoginForm";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

export const LoginPage = () => {
    return (
      <SafeAreaView style={styles.container}>
        <LoginForm />
      </SafeAreaView>
    );
};

 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
    }, 
});


export default LoginPage;