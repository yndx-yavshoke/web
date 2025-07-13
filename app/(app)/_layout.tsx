import {
  SplashScreen,
  Stack,
  useFocusEffect,
  usePathname,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
import { useSession } from "@/src/features/auth/SessionProvider";
import { Redirect } from "expo-router";
import { useExperiments } from "@/src/features/experiments/experimentsContext";
import { useEffect, useLayoutEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const { isLoading: isExperimentsLoading } = useExperiments();
  const { isLoading: isAuthLoading } = useSession();

  const isAppReady = !isExperimentsLoading && !isAuthLoading;

  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hide();
    }
  }, [isAppReady]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen options={{ animation: "none" }} name="index" />
      <Stack.Screen options={{ animation: "slide_from_right" }} name="edit" />
    </Stack>
  );
}
