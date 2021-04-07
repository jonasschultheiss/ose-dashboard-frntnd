import { CheckIcon } from '@heroicons/react/solid';
import useQuery from '@utils/useQuery';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';

export default function Index() {
  const [JWT, setJWT] = useState();
  const [requestError, setRequestError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const query = useQuery();
  const router = useRouter();

  useEffect(() => {
    if (requestError) {
      router.push('/register/error');
    }
  }, [requestError, router]);

  useEffect(() => {
    const asyncRequest = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: query.code
        })
      });

      if (!response.ok) {
        setIsLoaded(true);
        setRequestError(true);
      }

      const result = await response.json();
      setIsLoaded(true);
      setJWT(result.accessToken);
    };
    if (query && query.code) {
      asyncRequest();
    }
  }, [query, router]);

  const signingIn = (
    <>
      <Loader className="mb-4" type="Grid" width="60" height="60" color="#171717" />
      <h1 className="text-gray-900 font-semibold text-xl text-center">We are signing you in</h1>
      <p className="mt-4 text-gray-900 text-lg text-center">Just a moment...</p>
    </>
  );

  return (
    <div className="flex justify-center items-center w-full h-full">
      <Head>
        <title>Register</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
      `}</style>
      <div className="border-2 border-gray-900 p-6 rounded-md flex flex-col items-center max-w-lg">
        {isLoaded ? <CheckIcon className="w-16 h-16 text-gray-900 mb-4" /> : signingIn}
      </div>
    </div>
  );
}
