import React from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useCallbackRef } from "@radix-ui/react-use-callback-ref";
import { Button } from "@/src/shared/ui/button/Button";
import { useRouter } from "expo-router";
import { useSession } from "@/src/features/auth/SessionProvider";
import { createAuthenticatedApiClient } from "@/src/shared/lib/apiClient/authenticatedApiClient";
import { useResponsiveStyles } from "@/src/shared/lib/responsive/responsiveStyles";

interface EditFormData {
  name: string;
}

export const EditForm = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { authToken, userData, setUserData } = useSession();
  const { isDesktop } = useResponsiveStyles();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EditFormData>({
    reValidateMode: "onSubmit",
    defaultValues: {
      name: userData?.name || "",
    },
  });

  const onSubmit = useCallbackRef(async (formData: EditFormData) => {
    if (!authToken) {
      Alert.alert("Error", "You must be logged in to edit your profile");
      return;
    }

    try {
      const apiClient = createAuthenticatedApiClient(authToken);
      const { error, data } = await apiClient.user.name.patch({
        name: formData.name.trim(),
      });

      if (error) {
        if (error.status === 422) {
          setError("name", {
            message: "Please check your input and try again",
          });
        } else if (error.status === 401) {
          Alert.alert("Error", "Your session has expired. Please log in again.");
        } else {
          setError("root", {
            message: "An error occurred. Please try again.",
          });
        }
        return;
      }

      // Update user data in session
      setUserData(data.user);
      
      Alert.alert("Success", "Your name has been updated successfully!", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } catch (e) {
      console.log(e);
      setError("root", {
        message: "Произошла ошибка",
      });
    }
  });

  const handleGoBack = useCallbackRef(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.replace("/");
    }
  });

  return (
    <View style={[styles.container, isDesktop && styles.desktopContainer]}>
      <Text style={[styles.title, isDesktop && styles.desktopTitle]}>
        Edit Profile
      </Text>
      
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, isDesktop && styles.desktopLabel]}>
            Name
          </Text>
          <Controller
            control={control}
            name="name"
            rules={{
              required: "Name is required",
              minLength: {
                value: 1,
                message: "Name must be at least 1 character",
              },
              maxLength: {
                value: 50,
                message: "Name must be less than 50 characters",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  isDesktop && styles.desktopInput,
                  errors.name && styles.inputError,
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your name"
                autoCapitalize="words"
                autoCorrect={false}
              />
            )}
          />
          {errors.name && (
            <Text style={styles.errorText}>{errors.name.message}</Text>
          )}
        </View>

        {errors.root && (
          <Text style={styles.errorText}>{errors.root.message}</Text>
        )}

        <View style={styles.buttonContainer}>
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            style={[styles.saveButton, isDesktop && styles.desktopButton]}
          >
            <Text style={[styles.saveButtonText, isDesktop && styles.desktopButtonText]}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Text>
          </Button>

          <Button
            onPress={handleGoBack}
            disabled={isSubmitting}
            style={[styles.cancelButton, isDesktop && styles.desktopButton]}
          >
            <Text style={[styles.cancelButtonText, isDesktop && styles.desktopButtonText]}>
              Cancel
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  desktopContainer: {
    padding: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  desktopTitle: {
    fontSize: 32,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  desktopLabel: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  desktopInput: {
    padding: 16,
    fontSize: 18,
  },
  inputError: {
    borderColor: "#ff4444",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    marginTop: 4,
  },
  buttonContainer: {
    gap: 12,
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
  desktopButton: {
    padding: 20,
  },
  desktopButtonText: {
    fontSize: 18,
  },
}); 