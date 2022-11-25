import { useState } from "react";

type Payload = unknown;

export const useHttpTransport = (apiUrl: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const abortController = new AbortController();
  const { signal } = abortController;

  const maybeStringify = (payload: Payload): string => {
    try {
      return JSON.stringify(payload);
    } catch (error) {
      return payload as unknown as string;
    }
  };

  const post = async (payload: Payload): Promise<void> => {
    setLoading(true);
    setError(undefined);

    try {
      await fetch(apiUrl, {
        method: "POST",

        body: maybeStringify(payload),
        signal,
      });
    } catch (error) {
      setError(error as Error);
    }

    setLoading(false);
  };

  return {
    post,
    error,
    loading,
  };
};
