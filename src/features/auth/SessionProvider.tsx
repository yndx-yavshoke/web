import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  memo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SecureValues } from "@/src/shared/constants/SecureValues";
import { useCallbackRef } from "@radix-ui/react-use-callback-ref";
import { StorageValues } from "@/src/shared/constants/StorageValues";
import { InferTreatyResponse } from "@/src/shared/lib/apiClient/utils";
import { apiClient } from "@/src/shared/lib/apiClient/apiClient";
import { Platform } from "react-native";
import { useSecureValue } from "@/src/shared/lib/use-secure-value/useSecureValue";

// Web implementations for AsyncStorage
const webAsyncStorage = {
  getItem: async (key: string): Promise<string | null> => {
    return localStorage.getItem(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    localStorage.setItem(key, value);
    return;
  },
  removeItem: async (key: string): Promise<void> => {
    localStorage.removeItem(key);
    return;
  },
};

// Use platform-specific storage
const storage = Platform.OS === 'web' ? webAsyncStorage : AsyncStorage;

type SessionContextType = {
  isLoading: boolean;
  isAuthenticated: boolean;
  authToken: string | null;
  logout: VoidFunction;
  userData: UserData | null;
  setUserData: (userData: UserData | null) => void;
  setAuthToken: (token: string | null) => void;
};

const SessionContext = createContext<SessionContextType | null>(null);

type UserData = InferTreatyResponse<typeof apiClient.auth.login.post>["user"];

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { value: secureAuthToken, setValue: setSecureAuthToken } = useSecureValue(SecureValues.AuthToken);

  const loadUserData = useCallbackRef(async () => {
    try {
      const userData = await storage.getItem(StorageValues.UserData);
      if (!userData) {
        return;
      }

      setUserData(JSON.parse(userData));
    } catch (error) {
      console.error("Failed to load user data:", error);
    }
  });

  const handleSetUserData = useCallbackRef((userData: UserData | null) => {
    try {
      if (userData) {
        storage.setItem(StorageValues.UserData, JSON.stringify(userData));
      } else {
        storage.removeItem(StorageValues.UserData);
      }

      setUserData(userData);
    } catch (error) {
      console.error("Failed to save user data:", error);
    }
  });

  // Initialize auth from secure storage
  useEffect(() => {
    if (secureAuthToken !== null) {
      setAuthToken(secureAuthToken);
      setIsAuthenticated(!!secureAuthToken);
    }
  }, [secureAuthToken]);

  useEffect(() => {
    loadUserData().finally(() => {
      setIsLoading(false);
    });
  }, []);

  const logout = useCallbackRef(async () => {
    return Promise.all([handleSetAuthToken(null), handleSetUserData(null)]);
  });

  const handleSetAuthToken = useCallbackRef(async (token: string | null) => {
    try {
      setSecureAuthToken(token);
      setAuthToken(token);
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error("Failed to save auth token:", error);
    }
  });

  const value = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      authToken,
      logout,
      userData,
      setUserData: handleSetUserData,
      setAuthToken: handleSetAuthToken,
    }),
    [
      isAuthenticated,
      userData,
      logout,
      isLoading,
      authToken,
      handleSetAuthToken,
      handleSetUserData,
    ]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
