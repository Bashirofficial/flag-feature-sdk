import { useContext } from "react";
import { FeatureFlagContext } from "../context";
import { FeatureFlagClient } from "../../index";

export function useFeatureFlagClient(): FeatureFlagClient {
  const client = useContext(FeatureFlagContext);

  if (!client) {
    throw new Error(
      "useFeatureFlagClient must be used within FeatureFlagProvider",
    );
  }

  return client;
}
