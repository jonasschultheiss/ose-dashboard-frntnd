import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';

export default function Button({ children, fullWidth, clicked, arrowLeft, arrowRight, disabled }) {
  let classes = 'flex flex-row justify-center bg-gray-900 text-gray-100 rounded-md px-4 py-2 mt-2 focus:outline-none';
  if (fullWidth) {
    classes += ' w-full';
  }

  if (disabled) {
    classes += ' disabled:opacity-50';
  }

  return (
    <button onClick={() => clicked()} disabled={disabled} className={classes}>
      {arrowLeft && <ArrowLeftIcon className="mr-2 w-6 h-6 text-gray-100" />}
      <span className="text-lg font-semibold">{children}</span>
      {arrowRight && <ArrowRightIcon className="ml-2 w-6 h-6 text-gray-100" />}
    </button>
  );
}
