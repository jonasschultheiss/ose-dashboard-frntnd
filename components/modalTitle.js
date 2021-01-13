import Image from 'next/image';

export default function ModalTitle({ tag, manufacturer, unselect, code }) {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row">
        <div className="flex flex-row">
          <Image alt="Namur icon" src={`/${code}.svg`} width="45" height="45" />
          <div className="flex flex-col ml-4">
            <p className="text-xl font-semibold">{tag}</p>
            <p className="text-lg font-medium">{manufacturer}</p>
          </div>
        </div>
      </div>
      <Image alt="Close Icon" src="/cancel.svg" width="25" height="25" onClick={() => unselect()} />
    </div>
  );
}
