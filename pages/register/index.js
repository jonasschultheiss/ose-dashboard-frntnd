import Register from '@components/register';
import RegisterError from '@components/registerError';
import { useAuth } from 'contexts/authContext';
import Head from 'next/head';
import Loader from 'react-loader-spinner';

export default function Index() {
  const { isAuthenticated, isLoading, requestError } = useAuth();

  const loadingIndicator = (
    <>
      <Loader className="mb-4" type="Grid" width="60" height="60" color="#171717" />
      <h1 className="text-gray-900 font-semibold text-xl text-center">We are signing you in</h1>
      <p className="mt-4 text-gray-900 text-lg text-center">Just a moment...</p>
    </>
  );

  let content;

  if (requestError) {
    content = <RegisterError />;
  } else if (!isAuthenticated && isLoading) {
    content = loadingIndicator;
  } else {
    content = <Register />;
  }

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
      <div className="border-2 border-gray-900 p-6 rounded-md flex flex-col items-center max-w-lg">{content}</div>
    </div>
  );
}
