import { useRef, useState } from "react";

type Payload = unknown;

export const useHttpTransport = (apiUrl: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const abortController = new AbortController();
  const { signal } = abortController;
  const queue = useRef<Array<Payload>>([]);
  const [promise, setPromise] = useState<Promise<Payload> | undefined>();

  const maybeStringify = (payload: Payload): string => {
    try {
      return JSON.stringify(payload);
    } catch (error) {
      return payload as unknown as string;
    }
  };

  const chain = (payload: Payload): void => {
    queue.current.push(payload);

    if (!promise) next();
  };

  const next = async () => {
    if (queue.current.length) {
      const current = queue.current.shift();

      setPromise(post(current).then(() => next()));
    } else {
      setPromise(undefined);
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
    chain,
    error,
    loading,
  };
};
