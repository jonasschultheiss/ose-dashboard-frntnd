import { ArrowLeftIcon, XIcon } from '@heroicons/react/solid';

export default function RegisterError() {
  return (
    <>
      <XIcon className="w-16 h-16 text-gray-900 mb-4" />
      <h1 className="text-gray-900 font-semibold text-xl text-center">Unfortunatly an error occured</h1>
      <p className="mt-4 text-gray-900 text-lg text-center">
        An error occured during the sign in process with Netilion ID. If you happen to see this message, our apprentice
        made a mistake as this is not caused by Netilion.
      </p>
      <p className="mt-4 text-gray-900 text-lg font-semibold text-center">
        You&apos;ll be redirected to the start page in
      </p>
      <p className="text-gray-900 font-bold text-xl">15 seconds.</p>
      <a href="/" className="flex flex-row justify-center bg-gray-900 text-gray-100 rounded-md px-4 py-2 mt-4">
        <ArrowLeftIcon className="text-gray-100 w-6 h-6 mr-2" /> Back to start
      </a>
    </>
  );
}
