import Button from '@components/button';
import { CheckIcon, XIcon } from '@heroicons/react/solid';
import { baseAPI } from '@utils/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';

export default function RegisterLinkAssets({ model, done }) {
  const [error, setError] = useState();
  const [areAssetsLinked, setAreAssetsLinked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const linkAssets = async () => {
      try {
        await baseAPI.post(`/models/${model.id}/autolink`);
        await baseAPI.patch('/users/finished-setup');
        setAreAssetsLinked(true);
      } catch (error) {
        setError(error);
      }
    };

    linkAssets();
  }, [model]);

  const redirectToSettings = () => {
    router.push('/settings/assets');
  };

  let content = (
    <>
      <Loader className="mb-4" type="Grid" width="60" height="60" color="#171717" />
      <h1 className="text-gray-900 font-semibold text-xl text-center">Sign in was successful</h1>
      <p className="mt-4 text-gray-900 text-lg text-center"></p>
    </>
  );

  if (error) {
    content = (
      <>
        <XIcon className="w-16 h-16 text-gray-900 mb-4" />
        <p className="mt-4 text-gray-900 text-lg text-center">
          Unfortunatly we couldn’t link all the assets correctly. To finish the setup process you have to manually link
          the remaining ones in the settings menu.
        </p>
        <Button fullWidth arrowRight clicked={redirectToSettings}>
          Continue to settings
        </Button>
      </>
    );
  } else if (areAssetsLinked) {
    content = (
      <>
        <CheckIcon className="w-16 h-16 text-gray-900 mb-4" />
        <p className="mt-4 text-gray-900 text-lg text-center">
          We successfully linked your assets to all the meshes. The setup concludes with this step, you can now log out
          now
        </p>
        <Button fullWidth clicked={done}>
          Log out and go back to start
        </Button>
      </>
    );
  }

  return content;
}
