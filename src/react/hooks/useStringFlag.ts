import { useFeatureFlagClient } from "../provider";
import { useAsyncFlag } from "../internal/useAsyncFlag";

export function useStringFlag(key: string, defaultValue: string = "") {
  const client = useFeatureFlagClient();

  const { value, loading, error, refetch } = useAsyncFlag(
    () => client.getString(key, defaultValue),
    defaultValue,
    [client, key],
  );

  return { value, loading, error, refetch };
}
