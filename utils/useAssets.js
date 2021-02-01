import useSWR from 'swr';

export default function useAssets() {
  const { data, error } = useSWR('/api/assets', { refreshInterval: 10000 });

  return {
    assets: data?.assets,
    isLoading: !error && !data,
    isError: error,
  };
}
