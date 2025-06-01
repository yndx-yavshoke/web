import { useCallbackRef } from "@radix-ui/react-use-callback-ref";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, StyleSheet, Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/src/shared/ui/button/Button";
import { apiClient } from "@/src/shared/lib/apiClient/apiClient";
import ConfettiCannon from "react-native-confetti-cannon";
import { Image } from "expo-image";
import { ResponsiveContainer } from "@/src/shared/ui/responsive-container/ResponsiveContainer";
import { useResponsiveStyles } from "@/src/shared/lib/responsive/responsiveStyles";

export const MainPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isExist, setExist] = useState<"unknown" | "exist" | "not-exist">(
    "unknown"
  );
  const { isDesktop } = useResponsiveStyles();

  const checkExist = useCallbackRef(async () => {
    const { error, data } = await apiClient.exist.post({ email });

    if (error) {
      Alert.alert("Ошибка", "Серверная ошибка");
      return;
    }

    setExist(data.exist ? "exist" : "not-exist");
  });

  return (
    <SafeAreaView style={styles.container}>
      <ResponsiveContainer style={styles.contentWrapper}>
        <Text style={[styles.title, isDesktop && styles.desktopTitle]}>Я в ШОКе</Text>

        <TextInput
          style={[styles.input, isDesktop && styles.desktopInput]}
          placeholder="Введите email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {isExist === "exist" && (
          <Image
            source={require("../../../assets/images/happyCat.gif")}
            style={[
              { height: 300, width: 300, marginBottom: 10 },
              isDesktop && { height: 400, width: 400 }
            ]}
          />
        )}
        
        {isExist !== "unknown" && (
          <Text
            style={[
              styles.statusText,
              { color: isExist === "exist" ? "green" : "red" },
              isDesktop && styles.desktopStatusText
            ]}
          >
            {isExist === "exist" ? "Ты уже в ШОКе" : "Ты еще не в ШОКе"}
          </Text>
        )}

        <View style={{width: isDesktop ? 300 : "100%"}}>
            <Button
              disabled={email.length === 0}
              onPress={checkExist}
              variant="secondary"
              fullWidth={true}
              style={[{ marginBottom: 10 }, isDesktop && styles.desktopButton]}
            >
              Я в шоке?
            </Button>
          </View>

        <View style={{width: isDesktop ? 300 : "100%"}}>
          <Button 
            onPress={() => router.push("/login")} 
            fullWidth={true}
            style={isDesktop && styles.desktopButton}
          >
            В шок
          </Button>
        </View>
        
        {isExist === "exist" && (
          <ConfettiCannon count={isDesktop ? 300 : 200} origin={{ x: -10, y: 0 }} />
        )}
      </ResponsiveContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentWrapper: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  desktopTitle: {
    fontSize: 36,
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    maxWidth: 400,
  },
  desktopInput: {
    height: 50,
    fontSize: 18,
    marginBottom: 30,
  },
  statusText: {
    fontSize: 30,
    marginBottom: 10,
    color: "green",
  },
  desktopStatusText: {
    fontSize: 40,
    marginBottom: 20,
  },
  desktopButtonContainer: {
    width: 300,
  },
  desktopButton: {
    height: 50,
  },
});
