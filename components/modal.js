import Attribute from '@components/attribute';
import AttributeTitle from '@components/attributeTitle';
import ModalTitle from '@components/modalTitle';
import useSanitizedAsset from '@utils/useSanitizedAsset';
import { motion } from 'framer-motion';

export default function modal({ unselect, asset }) {
  const { id, serial_number, last_seen, production_date, tag, product, status } = useSanitizedAsset(asset);
  console.log('🚀 ~ file: modal.js ~ line 9 ~ modal ~ status', status);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={variants} className="flex flex-row justify-end z-30 absolute w-screen p-8 md:p-16">
      <div className="border-2 rounded-md w-1/3 border-gray-900 p-4 ">
        <ModalTitle tag={tag.name} manufacturer={product.manufacturer} unselect={unselect} code={status.code} />
        <AttributeTitle title={'Product'} />
        <Attribute name={'Name'} value={product.name} />
        <Attribute name={'Code'} value={product.product_code} />
        <Attribute name={'Serial number'} value={serial_number} />
        <Attribute name={'Production date'} value={production_date} />
        <AttributeTitle title={'Netilion'} />
        <Attribute name={'Netilion ID'} value={id} />
        {asset.last_seen_at ? <Attribute name={'Last seen'} value={last_seen} /> : null}
        <AttributeTitle title={'Status'} />
        <Attribute name={'Current status'} value={status.name} />
        <Attribute name={'Description'} value={status.description} />
        <AttributeTitle title={'Tag'} />
        <Attribute name={'Name'} value={tag.name} />
        <Attribute name={'Description'} value={tag.description} />
        <Attribute name={'Accessibility'} value={tag.accessibility} />
        <Attribute name={'Criticality'} value={tag.criticality} />
      </div>
    </motion.div>
  );
}
