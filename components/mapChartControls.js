import ControlButton from '@components/controlButton';
import { MinusIcon, PlusIcon } from '@heroicons/react/solid';

export default function MapChartControls({ resetClicked, zoomIn, zoomOut, resetEnabled }) {
  return (
    <div className="flex absolute top-0 left-0 z-20 justify-between mx-2 space-x-2 ">
      <ControlButton clicked={zoomIn}>
        <PlusIcon className="w-6 h-6 text-gray-100" />
      </ControlButton>
      <ControlButton clicked={zoomOut}>
        <MinusIcon className="w-6 h-6 text-gray-100" />
      </ControlButton>

      {resetEnabled && <ControlButton clicked={resetClicked}>Reset position</ControlButton>}
    </div>
  );
}
