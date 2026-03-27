import { createContext, useContext } from "react";
import { FeatureFlagClient } from "../index";

const FeatureFlagContext = createContext<FeatureFlagClient | null>(null);

export const FeatureFlagProvider = ({
  client,
  children,
}: {
  client: FeatureFlagClient;
  children: React.ReactNode;
}) => {
  return (
    <FeatureFlagContext.Provider value={client}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export function useFeatureFlagClient(): FeatureFlagClient {
  const client = useContext(FeatureFlagContext);
  if (!client) throw new Error("Missing FeatureFlagProvider");
  return client;
}
