import { useEffect, useState } from 'react';

/**
 * 서비스 함수를 불러 결과를 화면에 넘겨주는 도우미입니다.
 * 데이터를 받는 중(loading), 실패(error), 성공(data) 상태를 함께 알려 줍니다.
 */
export function useAsync<T>(load: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<{ data: T | null; loading: boolean; error: Error | null }>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });
    load()
      .then((data) => !cancelled && setState({ data, loading: false, error: null }))
      .catch((error: Error) => !cancelled && setState({ data: null, loading: false, error }));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
