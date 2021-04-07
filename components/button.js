import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';

export default function Button({ children, fullWidth, clicked, arrowLeft, arrowRight }) {
  let classes = 'flex flex-row justify-center bg-gray-900 text-gray-100 rounded-md px-4 py-2 mt-4';
  if (fullWidth) {
    classes += ' w-full';
  }

  return (
    <button onClick={() => clicked()} className={classes}>
      {arrowLeft && <ArrowLeftIcon className="text-gray-100 w-6 h-6 mr-2" />}
      {children}
      {arrowRight && <ArrowRightIcon className="text-gray-100 w-6 h-6 ml-2" />}
    </button>
  );
}
