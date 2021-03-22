import moment from 'moment';
import Image from 'next/image';

export default function ModalTitle({ tag, manufacturer, unselect, code, last_seen }) {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row">
        <div className="flex flex-row">
          <Image className="w-full" alt="Namur icon" src={`/${code}.svg`} width="50" height="50" />
          <div className="flex flex-col ml-4">
            <p className="text-xl font-semibold">{tag}</p>
            <p className="text-md font-medium">{manufacturer}</p>
            {last_seen ? (
              <p className="text-md font-medium">Last seen: {moment(new Date(last_seen)).fromNow()}</p>
            ) : undefined}
          </div>
        </div>
      </div>
      <Image alt="Close Icon" src="/cancel.svg" width="25" height="25" onClick={() => unselect()} />
    </div>
  );
}
