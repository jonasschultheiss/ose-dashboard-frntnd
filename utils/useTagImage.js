import useSWR from 'swr';

export default function useTagImage(id) {
  const { data, error } = useSWR(`/api/tags/${id}`);
  console.log('🚀 ~ file: useTagImage.js ~ line 5 ~ useTagImage ~ data', data);
  console.log('🚀 ~ file: useTagImage.js ~ line 5 ~ useTagImage ~ error', error);

  return {
    src: data?.pictures[0]?.download_href,
    isLoading: !error && !data,
    isError: error,
  };
}
