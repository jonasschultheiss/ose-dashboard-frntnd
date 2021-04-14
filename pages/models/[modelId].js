import Header from '@components/header';
import Modal from '@components/modal';
import Scene from '@components/scene';
import { baseAPI } from '@utils/api';
import filterByLink from '@utils/filterByLink';
import useModal from '@utils/useModal';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import DebugStats from 'react-fps-stats';

export default function Index() {
  // make use of isError prop
  // const { assets, isLoading, isError } = useAssets();
  const [assets, setAssets] = useState([]);
  const [model, setModel] = useState();
  const { openModal, closeModal, open, asset } = useModal();
  const router = useRouter();
  const { modelId } = router.query;

  useEffect(() => {
    const fetchModel = async () => {
      const { data: requestedModel } = await baseAPI.get(`/models/${modelId}`);
      setModel(requestedModel);
    };

    if (modelId) {
      fetchModel();
    }
  }, [modelId]);

  useEffect(() => {
    const fetchAssets = async () => {
      const { data: requestedAssets } = await baseAPI.get(`/models/${modelId}/assets`);
      setAssets(requestedAssets);
    };

    if (modelId) {
      fetchAssets();
    }
  }, [modelId]);

  const assetSelected = meshName => {
    if (!open) {
      const selectedAsset = filterByLink(assets, meshName);
      if (selectedAsset) {
        openModal(selectedAsset);
      }
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
      <style jsx global>{`
        #__next {
          height: 100%;
        }
      `}</style>
      <Header model={model} />
      {open ? <Modal assetId={asset.id} unselect={assetUnselected} /> : undefined}
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
