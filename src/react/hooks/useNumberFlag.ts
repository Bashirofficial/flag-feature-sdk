import { useFeatureFlagClient } from "./useClient";
import { useAsyncFlag } from "../internal/useAsyncFlag";

export function useNumberFlag(key: string, defaultValue: number = 0) {
  const client = useFeatureFlagClient();

  const { value, loading, error, refetch } = useAsyncFlag(
    () => client.getNumber(key, defaultValue),
    defaultValue,
    [client, key],
  );

  return { value, loading, error, refetch };
}
