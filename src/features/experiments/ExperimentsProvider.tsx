import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  Experiments,
  ExperimentsContext,
  initialExperiments,
} from "./experimentsContext";
import { useCallbackRef } from "@radix-ui/react-use-callback-ref";
import { apiClient } from "@/src/shared/lib/apiClient/apiClient";

interface ProviderProps {
  children: ReactNode;
}

export const ExperimentsProvider = ({ children }: ProviderProps) => {
  const [experiments, setExperiments] =
    useState<Experiments>(initialExperiments);
  const [isLoading, setIsLoading] = useState(true);

  const preloadExperiments = useCallbackRef(async () => {
    const { data, error } = await apiClient.experiments.get();

    if (error) {
      throw new Error("Failed to load experiments");
    }

    setExperiments(data);
    setIsLoading(false);
  });

  useEffect(() => {
    preloadExperiments();
  }, [preloadExperiments]);

  const value = useMemo(
    () => ({
      experiments,
      isLoading,
    }),
    [isLoading, experiments]
  );

  return (
    <ExperimentsContext.Provider value={value}>
      {children}
    </ExperimentsContext.Provider>
  );
};
