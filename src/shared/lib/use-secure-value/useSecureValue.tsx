import * as SecureStore from "expo-secure-store";
import { SecureKeys } from "../../constants/SecureValues";
import { useEffect, useState } from "react";
import { useCallbackRef } from "@radix-ui/react-use-callback-ref";
import { Platform } from "react-native";

// Web implementation using localStorage
const webStorage = {
  getItemAsync: async (key: string): Promise<string | null> => {
    return localStorage.getItem(key);
  },
  setItemAsync: async (key: string, value: string): Promise<void> => {
    localStorage.setItem(key, value);
    return;
  },
  deleteItemAsync: async (key: string): Promise<void> => {
    localStorage.removeItem(key);
    return;
  }
};

// Use the appropriate storage implementation based on platform
const storage = Platform.OS === 'web' ? webStorage : SecureStore;

export const useSecureValue = (key: SecureKeys) => {
  const [value, setValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadValue = useCallbackRef(async () => {
    try {
      const value = await storage.getItemAsync(key);
      setValue(value);
    } catch {
      setValue(null);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    loadValue();
  }, [loadValue]);

  // Add a setter function to make the hook more useful
  const setSecureValue = async (newValue: string | null) => {
    try {
      if (newValue === null) {
        await storage.deleteItemAsync(key);
        setValue(null);
      } else {
        await storage.setItemAsync(key, newValue);
        setValue(newValue);
      }
    } catch (error) {
      console.error("Failed to set secure value:", error);
    }
  };

  return { loading, value, setValue: setSecureValue };
};
