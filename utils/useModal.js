import { useState } from 'react';

export default function useModal() {
  const [open, setOpen] = useState(false);
  const [asset, setAsset] = useState(null);

  const openModal = (asset) => {
    setOpen(false);
    setAsset(asset);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setAsset(null);
  };

  return {
    openModal,
    closeModal,
    open,
    asset,
  };
}
