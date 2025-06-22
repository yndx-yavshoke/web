import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useCallbackRef } from "@radix-ui/react-use-callback-ref";
import { useExperiments } from "@/src/features/experiments/experimentsContext";
import { Button } from "@/src/shared/ui/button/Button";
import { apiClient } from "@/src/shared/lib/apiClient/apiClient";
import { useSession } from "@/src/features/auth/SessionProvider";
import { useResponsiveStyles } from "@/src/shared/lib/responsive/responsiveStyles";
import { useRouter } from "expo-router";

interface RegisterFormData {
  email: string;
  password: string;
  age?: string;
}

export const RegisterForm = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { setAuthToken, setUserData } = useSession();
  const { isDesktop } = useResponsiveStyles();
  const {
    experiments: { flags },
  } = useExperiments();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      age: "",
    },
  });

  const onSubmit = useCallbackRef(async (formData: RegisterFormData) => {
    try {
      const age = formData.age ? parseInt(formData.age) : undefined;

      const { error, data } = await apiClient.auth.register.post({
        ...formData,
        age,
      });

      if (error) {
        switch (error.status) {
          case 422:
            setError("email", {
              message: error.value.fields.email,
            });
            break;
          default:
            throw error.value;
        }
        return;
      }

      setAuthToken(data.token);
      setUserData(data.user);

      router.replace("/");
    } catch {
      setError("root", {
        message: "Произошла ошибка",
      });
    }
  });

  const handleGoBack = useCallbackRef(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.replace("/login");
    }
  });

  return (
    <>
      <Text style={[styles.title, isDesktop && styles.desktopTitle]}>Регистрация в ШОКе</Text>

      <Controller
        control={control}
        rules={{
          required: "Введите email",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Неправильный email-адрес",
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              testID="register-email-input"
              style={[
                styles.input,
                errors.email && styles.inputError,
                isDesktop && styles.desktopInput
              ]}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              placeholderTextColor="#666"
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          required: "Введите пароль",
          minLength: {
            value: 6,
            message: "Пароль должен содержать минимум 6 символов",
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              testID="register-password-input"
              style={[
                styles.input,
                error && styles.inputError,
                isDesktop && styles.desktopInput
              ]}
              placeholder="Пароль"
              onChangeText={onChange}
              value={value}
              secureTextEntry
              placeholderTextColor="#666"
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
        name="password"
      />

      {flags.age.enabled && (
        <Controller
          control={control}
          rules={{
            required: "Введите возраст",
            pattern: {
              value: /^\d+$/,
              message: "Возраст должен быть числом",
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TextInput
                testID="register-age-input"
                style={[
                  styles.input,
                  error && styles.inputError,
                  isDesktop && styles.desktopInput
                ]}
                placeholder="Возраст"
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                placeholderTextColor="#666"
              />
              {error && <Text style={styles.errorText}>{error.message}</Text>}
            </>
          )}
          name="age"
        />
      )}

      <View style={[styles.buttonContainer, isDesktop && styles.desktopButtonContainer]}>
        <Button 
          testID="register-submit-button"
          onPress={handleSubmit(onSubmit)}
          style={isDesktop && styles.desktopButton}
        >
          Зарегистрироваться
        </Button>

        <Button 
          testID="register-back-button"
          variant="secondary" 
          onPress={handleGoBack}
          style={isDesktop && styles.desktopButton}
        >
          Назад
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  desktopTitle: {
    fontSize: 36,
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  desktopInput: {
    height: 60,
    fontSize: 18,
    marginBottom: 15,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  buttonContainer: {
    justifyContent: "space-between",
    gap: 10,
  },
  desktopButtonContainer: {
    marginTop: 20,
  },
  desktopButton: {
    height: 50,
  },
}); 