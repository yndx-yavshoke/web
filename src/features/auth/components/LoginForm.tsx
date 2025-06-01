import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useCallbackRef } from "@radix-ui/react-use-callback-ref";
import { Button } from "@/src/shared/ui/button/Button";
import { useRouter } from "expo-router";
import { useSession } from "@/src/features/auth/SessionProvider";
import { apiClient } from "@/src/shared/lib/apiClient/apiClient";
import { useFormTestIds } from "@/src/shared/testing";

interface LoginFormData {
  email: string;
  password: string;
  age?: string;
}

export const LoginForm = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { setAuthToken, setUserData } = useSession();

  // Add test IDs for form elements
  const formElements = useFormTestIds('login', ['email', 'password', 'submit', 'back', 'register']);
  const [emailInput, passwordInput, submitButton, backButton, registerButton] = formElements;

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      age: "",
    },
  });

  const onSubmit = useCallbackRef(async (formData: LoginFormData) => {
    try {
      const { error, data } = await apiClient.auth.login.post(formData);

      if (error) {
        switch (error.status) {
          case 422:
            setError("root", { message: error.value.fields.password });
            break;
          default:
            throw error.value;
        }
        return;
      }

      setAuthToken(data.token);
      setUserData(data.user);

      router.replace("/");
    } catch (e) {
      console.log(e);
      setError("root", {
        message: "Произошла ошибка",
      });
    }
  });

  const handleOpenRegistration = useCallbackRef(() => {
    router.push("/register");
  });

  const handleGoBack = useCallbackRef(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.replace("/");
    }
  });

  return (
    <>
      <Text style={styles.title}>Войти в ШОК</Text>

      <Controller
        control={control}
        rules={{
          required: "Введите email",
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              ref={emailInput.ref}
              testID={emailInput.testID}
              style={[
                styles.input,
                (errors.email || errors.root) && styles.inputError,
              ]}
              placeholder="Email"
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              placeholderTextColor="#666"
              autoCapitalize="none"
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
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              ref={passwordInput.ref}
              testID={passwordInput.testID}
              style={[
                styles.input,
                (errors.email || errors.root) && styles.inputError,
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

      {errors.root && (
        <Text style={styles.errorText}>{errors.root.message}</Text>
      )}

      <View style={styles.actionsContainer}>
        <View style={styles.buttonContainer}>
          <Button 
            ref={submitButton.ref}
            testID={submitButton.testID}
            style={styles.buttonFlex} 
            onPress={handleSubmit(onSubmit)}
          >
            В шок
          </Button>

          <Button
            ref={backButton.ref}
            testID={backButton.testID}
            variant="secondary"
            style={styles.buttonFlex}
            onPress={handleGoBack}
          >
            Назад
          </Button>
        </View>
        <Button 
          ref={registerButton.ref}
          testID={registerButton.testID}
          onPress={handleOpenRegistration} 
          fullWidth
        >
          Регистрация
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 20,
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
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  buttonFlex: {
    flex: 1,
  },
  actionsContainer: {
    gap: 10,
    marginHorizontal: 5,
    marginTop: 20,
  },
});

export default LoginForm; 