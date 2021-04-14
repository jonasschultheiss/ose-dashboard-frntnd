import Attribute from '@components/attribute';
import AttributeTitle from '@components/attributeTitle';
import ModalTitle from '@components/modalTitle';
import { baseAPI } from '@utils/api';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Modal({ unselect, assetId }) {
  const [asset, setAsset] = useState();

  useEffect(() => {
    const fetchAsset = async () => {
      const { data: requestedAsset } = await baseAPI.get(`/assets/${assetId}`);
      setAsset(requestedAsset);
    };

    if (assetId) {
      fetchAsset();
    }
  }, [assetId]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="z-20 absolute w-screen h-screen p-8 md:p-16"
      onClick={() => unselect()}
    >
      <div className="border-2 rounded-md w-1/3 border-gray-900 p-4 float-right">
        <ModalTitle
          tag={asset?.tag?.name}
          manufacturer={asset?.product?.manufacturer}
          unselect={unselect}
          code={asset?.status?.code}
          last_seen={asset?.lastSeen}
        />
        <AttributeTitle title={'Product'} />
        <Attribute name={'Name'} value={asset?.product?.name} />
        <Attribute name={'Code'} value={asset?.product?.code} />
        <Attribute name={'Serial number'} value={asset?.serialNumber} />
        <Attribute name={'Production date'} value={asset?.productionDate} />
        <AttributeTitle title={'Status'} />
        <Attribute name={'Current status'} value={asset?.status?.name} />
        <Attribute name={'Description'} value={asset?.status?.description} />
        <AttributeTitle title={'Tag'} />
        <Attribute name={'Name'} value={asset?.tag?.name} />
        <Attribute name={'Description'} value={asset?.tag?.description} />
        <Attribute name={'Accessibility'} value={asset?.tag?.accessibility} />
        <Attribute name={'Criticality'} value={asset?.tag?.criticality} />
      </div>
    </motion.div>
  );
}
