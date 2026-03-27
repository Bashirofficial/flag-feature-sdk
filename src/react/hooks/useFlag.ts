import { useFeatureFlagClient } from "../provider";
import { useAsyncFlag } from "../internal/useAsyncFlag";

export function useFeatureFlag(key: string, defaultValue: boolean = false) {
  const client = useFeatureFlagClient();

  const { value, loading, error, refetch } = useAsyncFlag(
    () => client.isFlagEnabled(key, defaultValue),
    defaultValue,
    [client, key],
  );

  return { enabled: value, loading, error, refetch };
}
