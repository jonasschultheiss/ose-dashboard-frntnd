import Button from '@components/button';
import { CheckIcon } from '@heroicons/react/solid';
import { useAuth } from 'contexts/authContext';

export default function RegisterSignIn({ done }) {
  const { user } = useAuth();
  return (
    <>
      <CheckIcon className="w-16 h-16 text-gray-900 mb-4" />
      <h1 className="text-gray-900 font-semibold text-xl text-center">Sign in was successful</h1>
      <p className="mt-4 text-gray-900 text-lg text-center">
        You are logged in as <br />
        <span className=" text-sm font-mono bg-gray-400 p-1 rounded-md">{user && user.email}</span>.<br />
        You can now go on and add your model.
      </p>
      <p className="mt-4 text-gray-900 text-lg text-center">
        After you added your model and confirmed the linking this application will fetch the health data of your assets
        every 30 minutes.
      </p>
      <Button clicked={done} arrowRight fullWidth>
        Add your model
      </Button>
    </>
  );
}
