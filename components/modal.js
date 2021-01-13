import Image from 'next/image';

export default function modal({ unselect, asset }) {
  console.log('🚀 ~ file: modal.js ~ line 4 ~ modal ~ asset', asset);
  const tag = asset.instrumentations.items[0].tag;
  const manufacturer = asset.product.manufacturer.name;

  return (
    <div className="flex flex-row justify-end z-20 absolute w-screen p-8 md:p-16">
      <div className="border-2 rounded-md w-1/3 border-gray-900 p-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <div className="flex flex-col">
              <p className="text-xl font-semibold">{tag}</p>
              <p className="text-lg font-medium">{manufacturer}</p>
            </div>
          </div>
          <Image alt="Close Icon" src="/cancel.svg" width="25" height="25" onClick={() => unselect()} />
        </div>
        <hr className=" border-t-2 border-gray-900 mt-2 mb-6" />
        <p>
          <span className="font-medium">Netilion ID: </span>
          {asset.id}
        </p>
        <p>
          <span className="font-medium">Serial number: </span>
          {asset.serial_number}
        </p>
        <p>
          <span className="font-medium">Production date: </span>
          {asset.production_date}
        </p>
        <hr className=" border-t-2 border-gray-900 my-2" />

        <p>
          <span className="font-medium">Serial number: </span>
          {asset.serial_number}
        </p>
        <p>
          <span className="font-medium">Serial number: </span>
          {asset.serial_number}
        </p>
        <p>
          <span className="font-medium">Serial number: </span>
          {asset.serial_number}
        </p>
        <p>
          <span className="font-medium">Serial number: </span>
          {asset.serial_number}
        </p>
      </div>
    </div>
  );
}
