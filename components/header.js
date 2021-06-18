import { ArrowLeftIcon } from '@heroicons/react/solid';
import { baseAPI } from '@utils/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Header({ model }) {
  const [location, setLocation] = useState();
  const router = useRouter();

  useEffect(() => {
    const fetchLocation = async () => {
      const { data: requestedLocation } = await baseAPI.get(`/models/${model.id}/location`);
      setLocation(requestedLocation);
    };

    if (model) {
      fetchLocation();
    }
  }, [model]);

  const handleClick = () => {
    router.push('/');
  };

  return (
    <div className="absolute z-10 p-8 md:p-16 max-w-2xl max-h- overflow-hidden ">
      <button className="bg-gray-900 rounded-md px-4 py-2 mb-4 focus:outline-none" onClick={handleClick}>
        <ArrowLeftIcon className="text-gray-300 w-6 h-6" />
      </button>
      <h1 className="text-gray-900 text-xl pb-2 font-bold md:text-3xl break-words">{model?.name}</h1>
      <p className="text-gray-900 text-lg font-medium break-words">{location?.address.label}</p>
      <p className="text-gray-900 text-lg font-medium break-words">{model?.description}</p>
    </div>
  );
}
