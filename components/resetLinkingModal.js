import { ExclamationIcon } from '@heroicons/react/solid';
import { useState } from 'react';

import Button from './button';
import InputField from './inputField';

export default function ResetLinkingModal({ abort, confirm }) {
  const [input, setInput] = useState('');
  const confirmationText = 'confirm';

  const handleInputChanged = event => {
    setInput(() => {
      return event.target.value;
    });
  };

  return (
    <div
      className="z-10 bg-gray-900 bg-opacity-20 flex justify-center
    items-center absolute top-0 bottom-0 left-0 right-0"
    >
      <div className="border-2 border-gray-900 bg-gray-300 p-6 rounded-md flex flex-col items-center max-w-lg">
        <ExclamationIcon className="w-16 h-16 text-gray-900 mb-4" />
        <h1 className="text-gray-900 font-semibold text-xl text-center">Are you sure?</h1>
        <h2 className="text-gray-900 font-medium  text-lg text-center">
          <em className="not-italic text-red-700">You are about to reset the linking between all assets and meshes</em>
        </h2>
        <p className="mt-4 text-gray-900 text-lg text-center">
          Write <span className=" text-sm font-mono bg-gray-400 p-1 rounded-md">{confirmationText}</span> into the field
          below and click the button, to confirm your decision.
        </p>
        <InputField id="confirmationInput" name="confirmationInput" changed={event => handleInputChanged(event)} />

        <Button clicked={confirm} fullWidth disabled={input !== confirmationText}>
          Confirm reset
        </Button>
        <Button clicked={abort} fullWidth>
          Abort
        </Button>
      </div>
    </div>
  );
}
