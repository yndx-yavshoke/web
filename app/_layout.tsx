import { SessionProvider } from "@/src/features/auth/SessionProvider";
import { ExperimentsProvider } from "@/src/features/experiments/ExperimentsProvider";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <SessionProvider>
      <ExperimentsProvider>
        <Slot />
      </ExperimentsProvider>
    </SessionProvider>
  );
}
