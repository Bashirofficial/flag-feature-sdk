import { useFeatureFlagClient } from "./useClient";
import { useAsyncFlag } from "../internal/useAsyncFlag";

export function useAllFlags() {
  const client = useFeatureFlagClient();

  const { value, loading, error, refetch } = useAsyncFlag<Record<string, any>>(
    () => client.getAllFlags(),
    {},
    [client],
  );

  return { flags: value, loading, error, refetch };
}
