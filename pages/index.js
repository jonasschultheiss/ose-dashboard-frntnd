import MapChart from '@components/mapChart';
import { useAuth } from 'contexts/authContext';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Index() {
  const authURL = process.env.NEXT_PUBLIC_AUTH_URL;
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  if (isAuthenticated && user.finishedInitialSetup) {
    router.push('/settings/model');
  } else if (isAuthenticated && !user.finishedInitialSetup) {
    router.push('/register');
  }
  return (
    <div className="p-16">
      <h1 className="text-gray-900 text-2xl pb-2 font-bold md:text-3xl">One Story Exhibit Dashboard</h1>
      <p className="text-gray-900 text-lg font-medium">
        This website shows you all registered &#34;One Story Exhibit&#34; models of the Endress+Hauser Group. The models
        are available at various sales locations, trade fairs or partners. They are used by the respective training and
        sales teams to show customers an insight into our portfolio of measuring instruments. As this process is
        currently restricted by the Corona virus, the models were digitised by an IT apprentice. Netilion&apos;s new
        &#34;Connect Subscription&#34; offer was used for this. Basically, this website gets the data from Netilion via
        this new offer, connects it with external data and displays it interactively. Click on a pin on the world map to
        view the OSE model of that location.
      </p>
      <div className="flex justify-items-center mt-24 items-center bg-gray-900 rounded-lg overflow-hidden">
        <MapChart />
      </div>
      <div className="mt-24 bg-gray-900 rounded-md p-16 flex flex-row justify-between">
        <div className="w-2/4">
          <h2 className="text-gray-100 text-2xl font-bold">Responsible for an One Story Exhibit model?</h2>
          <h3 className="text-gray-100 text-xl font-medium">Sign in here and get your model featured</h3>
          <p className="text-gray-100 text-md font-medium mt-4">
            During the registration process you can enter the name, description and location of the model. Afterwards,
            your measuring devices are queried and automatically linked to the meshes of the 3D model. If you want to
            change the given information afterwards, you have to log in again, whereupon you will be redirected to the
            settings. After you added your model and confirmed the linking this application will fetch the health data
            of your assets every 30 minutes.
          </p>
          <div className="flex flex-row justify-start items-center">
            <a href={authURL} className=" text-gray-100 bg-blue-500 py-2 px-4 mt-4 font-bold text-lg rounded-md">
              Sign in with Netilion
            </a>
          </div>
        </div>
        <div className="relative w-1/3 h-64">
          <Image
            src="/OSEModel.png"
            alt="Picture of the One Story Exhibit Model in Reinach, Switzerland"
            layout="fill"
            objectFit="cover"
            priority="true"
          />
        </div>
      </div>
    </div>
  );
}
