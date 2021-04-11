import { useRouter } from 'next/router';

export default function SettingsNavLink({ path, currentPath, name, first, last }) {
  const router = useRouter();
  let classes = 'p-1 focus:outline-none border border-gray-900';

  classes += path === currentPath ? ' bg-gray-900 text-gray-300' : ' border-l-2 border-r-2  text-gray-900';

  if (first) {
    classes += ' rounded-t-md border-t-2';
  }

  if (last) {
    classes += ' rounded-b-md border-b-2';
  }

  const handleClicked = () => {
    router.push(path);
  };

  return (
    <button onClick={handleClicked} className={classes}>
      {name}
    </button>
  );
}
