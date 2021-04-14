import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import LinkingStatus from '@utils/linkingStatus';
import { useState } from 'react';

export default function SettingsLink({ asset, meshes, handleSelected }) {
  const [isOpen, setIsOpen] = useState(false);

  let linkingStatusClasses = 'font-semibold ';
  switch (asset.linkingStatus) {
    case LinkingStatus.AUTOMATICALLY_LINKED:
      linkingStatusClasses += 'text-green-700';
      break;
    case LinkingStatus.AUTOMATIC_LINKING_FAILED:
      linkingStatusClasses += 'text-red-700';
      break;
    case LinkingStatus.MANUALLY_LINKED:
      linkingStatusClasses += 'text-blue-700';
      break;
    case LinkingStatus.NOT_LINKED:
      linkingStatusClasses += 'text-yellow-700';
      break;
  }

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const selected = (assetId, meshName) => {
    handleSelected(assetId, meshName);
    setIsOpen(false);
  };

  return (
    <div className="border-2 rounded-md border-gray-900 my-2 flex flex-col divide-y-2 px-2 divide-gray-900">
      <div className=" grid grid-cols-3 p-2 divide-x-2 divide-gray-900 text-center">
        <div className="grid grid-rows-2">
          <p className="font-semibold">Serial Number</p>
          <p>{asset.serialNumber}</p>
        </div>
        <div className="grid grid-rows-2">
          <p className="font-semibold">Linking Status</p>
          <p className={linkingStatusClasses}>{asset.linkingStatus.replace('_', ' ')}</p>
        </div>
        <div className="grid grid-rows-2">
          <p className="font-semibold">Mesh</p>
          {asset.mesh ? <p>{asset.mesh.name}</p> : <p>None</p>}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center py-2">
        {isOpen && (
          <div className="flex flex-col w-full ">
            <p className="font-semibold text-center">Link &quot;{asset.serialNumber}&quot; with:</p>
            <div className="grid grid-cols-3">
              {meshes.map((mesh, index) => (
                <button
                  key={index}
                  className="text-gray-300 bg-gray-900 px-2 py-1 m-1 rounded-md"
                  onClick={() => selected(asset.id, mesh.name)}
                >
                  {mesh.name}
                </button>
              ))}
            </div>
          </div>
        )}
        <button className="bg-gray-900 rounded-md px-4  focus:outline-none" onClick={handleClick}>
          {isOpen ? (
            <ChevronUpIcon className="text-gray-300 w-6 h-6" />
          ) : (
            <ChevronDownIcon className="text-gray-300 w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}
