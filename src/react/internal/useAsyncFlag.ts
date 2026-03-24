import { useEffect, useState } from "react";

export function useAsyncFlag<T>(
  fetcher: () => Promise<T>,
  defaultValue: T,
  deps: any[] = [],
) {
  const [value, setValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = () => {
    let isActive = true;

    setLoading(true);
    setError(null);

    fetcher()
      .then((val) => {
        if (isActive) setValue(val);
      })
      .catch((err) => {
        if (isActive) {
          setError(err);
          setValue(defaultValue);
        }
      })
      .finally(() => {
        if (isActive) setLoading(false);
      });

    return () => {
      isActive = false;
    };
  };

  useEffect(() => {
    let isMounted = true;

    setLoading(true);

    fetcher()
      .then((val) => {
        if (isMounted) {
          setValue(val);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setValue(defaultValue);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, deps);

  return { value, loading, error, refetch };
}
