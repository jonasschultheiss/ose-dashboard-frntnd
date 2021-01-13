import useSWR from 'swr';

export default function useAssets() {
  const { data, error } = useSWR('/api/assets', { refreshInterval: 1000 * 5 });

  return {
    assets: data?.assets,
    isLoading: !error && !data,
    isError: error,
  };
}
