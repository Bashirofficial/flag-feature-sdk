// src/react.tsx
/**
 * React Hooks for Feature Flags SDK
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { FeatureFlagClient, FeatureFlagConfig } from "./index";

const FeatureFlagContext = createContext<FeatureFlagClient | null>(null);

interface FeatureFlagProviderProps {
  apiKey: string;
  baseUrl?: string;
  children: ReactNode;
}

export function FeatureFlagProvider({
  apiKey,
  baseUrl,
  children,
}: FeatureFlagProviderProps) {
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

export function useFeatureFlagClient(): FeatureFlagClient {
  const client = useContext(FeatureFlagContext);
  if (!client) {
    throw new Error(
      "useFeatureFlagClient must be used within FeatureFlagProvider",
    );
  }
  return client;
}

export function useFeatureFlag(key: string, defaultValue: boolean = false) {
  const client = useFeatureFlagClient();
  const [enabled, setEnabled] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFlag = () => {
    setLoading(true);
    setError(null);
    client
      .isFlagEnabled(key, defaultValue)
      .then(setEnabled)
      .catch((err) => {
        setError(err);
        setEnabled(defaultValue);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFlag();
  }, [client, key]);

  return { enabled, loading, error, refetch: fetchFlag };
}

export function useStringFlag(key: string, defaultValue: string = "") {
  const client = useFeatureFlagClient();
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    client
      .getString(key, defaultValue)
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
  }, [client, key]);

  return { value, loading, error };
}

export function useNumberFlag(key: string, defaultValue: number = 0) {
  const client = useFeatureFlagClient();
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    client
      .getNumber(key, defaultValue)
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
  }, [client, key]);
  return { value, loading, error };
}

export function useJSONFlag<T = any>(key: string, defaultValue: T) {
  const client = useFeatureFlagClient();
  const [value, setValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    client
      .getJSON(key, defaultValue)
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
  }, [client, key]);

  return { value, loading, error };
}

export function useAllFlags() {
  const client = useFeatureFlagClient();
  const [flags, setFlags] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    client
      .getAllFlags()
      .then(setFlags)
      .catch((err) => {
        setError(err);
        setFlags({});
      })
      .finally(() => setLoading(false));
  }, [client]);

  return { flags, loading, error };
}
