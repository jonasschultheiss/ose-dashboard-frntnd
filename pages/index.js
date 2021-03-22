import Header from '@components/header';
import Modal from '@components/modal';
import Scene from '@components/scene';
import filterByAssetId from '@utils/filterByAssetId';
import useAssets from '@utils/useAssets';
import useModal from '@utils/useModal';
import Head from 'next/head';
// import DebugStats from 'react-fps-stats';

export default function Index() {
  // make use of isError prop
  // const { assets, isLoading, isError } = useAssets();
  const { assets, isLoading } = useAssets();
  const { openModal, closeModal, open, asset } = useModal();

  const assetSelected = id => {
    if (!open || !isLoading) {
      openModal(filterByAssetId(assets, id));
    }
  };

  const assetUnselected = () => {
    closeModal();
  };

  return (
    <>
      <Head>
        <title>OSE Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      {open ? <Modal asset={asset} unselect={assetUnselected} isLoading={isLoading} /> : undefined}
      {/* <DebugStats /> */}
      <Scene assetSelected={assetSelected} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   // ${process.env.API_BASE_URL}
//   const res = await fetch(`https://api.iiot.endress.com/v1/instrumentations?per_page=50&include=pictures%2C%20specifications%2C%20status`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Basic ${process.env.API_AUTHORIZATION}`,
//       'Api-Key': process.env.API_KEY,
//     },
//   });
//   const data = await res.json();

//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { assets: data.instrumentations },
//   };
// }
