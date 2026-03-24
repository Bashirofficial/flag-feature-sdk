import { useState, ReactNode, ReactElement } from "react";
import { FeatureFlagClient } from "../index";
import { FeatureFlagContext } from "./context";

interface FeatureFlagProviderProps {
  apiKey: string;
  baseUrl?: string;
  children: ReactNode;
}

export function FeatureFlagProvider({
  apiKey,
  baseUrl,
  children,
}: FeatureFlagProviderProps): ReactElement {
  const [client] = useState(
    () =>
      new FeatureFlagClient({
        apiKey,
        baseUrl,
      }),
  );

  return (
    <FeatureFlagContext.Provider value={client}>
      {children}
    </FeatureFlagContext.Provider>
  );
}
