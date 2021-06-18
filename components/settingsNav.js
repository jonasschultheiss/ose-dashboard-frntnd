import SettingsNavLink from '@components/settingsNavItem';
import { useRouter } from 'next/router';

export default function SettingsNav() {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <div className="flex flex-col w-40">
      <SettingsNavLink path="/settings/model" currentPath={currentPath} name="Model" first />
      <SettingsNavLink path="/settings/location" currentPath={currentPath} name="Location" />
      <SettingsNavLink path="/settings/assets" currentPath={currentPath} name="Assets" last />
    </div>
  );
}
