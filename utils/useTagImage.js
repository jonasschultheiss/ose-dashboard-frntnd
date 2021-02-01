import useSWR from 'swr';

export default function useTagImage(id) {
  const { data, error } = useSWR(`/api/tags/${id}`);

  return {
    src: data?.pictures[0]?.download_href,
    isLoading: !error && !data,
    isError: error,
  };
}
