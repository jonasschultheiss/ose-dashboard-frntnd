import Button from '@components/button';
import SettingsNav from '@components/settingsNav';
import { useAuth } from 'contexts/authContext';

export default function SettingsLayout({ children, saveDisabled, clicked }) {
  const { user, logout } = useAuth();

  return (
    <div className="p-12">
      <h1 className="text-gray-900 text-2xl pb-2 font-bold md:text-3xl">Settings for model {user?.model?.name}</h1>
      <div className="flex flex-row justify-between mt-8">
        <SettingsNav />
        <div className="flex flex-col w-1/3">{children}</div>
        <div className="flex flex-col">
          <Button clicked={logout}>Sign out</Button>
          <Button clicked={clicked} disabled={saveDisabled}>
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
}
