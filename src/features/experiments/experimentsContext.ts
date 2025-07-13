import React from "react";
import { InferTreatyResponse } from "@/src/shared/lib/apiClient/utils";
import { apiClient } from "@/src/shared/lib/apiClient/apiClient";

export type Experiments = InferTreatyResponse<typeof apiClient.experiments.get>;

interface ExperimentsContext {
  experiments: Experiments;
  isLoading: boolean;
}

export const initialExperiments: Experiments = {
  flags: {
    age: {
      enabled: false,
      oldFrom: 18,
      youngFrom: 20,
    },
  },
};

export const ExperimentsContext = React.createContext<ExperimentsContext>({
  experiments: initialExperiments,
  isLoading: true,
});

export const useExperiments = () => {
  const context = React.useContext(ExperimentsContext);
  if (!context) {
    throw new Error("useExperiments must be used within a ExperimentsProvider");
  }
  return context;
};
