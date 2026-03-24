import { useFeatureFlagClient } from "./useClient";
import { useAsyncFlag } from "../internal/useAsyncFlag";

export function useJSONFlag<T = any>(key: string, defaultValue: T) {
  const client = useFeatureFlagClient();

  const { value, loading, error, refetch } = useAsyncFlag<T>(
    () => client.getJSON(key, defaultValue),
    defaultValue,
    [client, key],
  );

  return { value, loading, error, refetch };
}
