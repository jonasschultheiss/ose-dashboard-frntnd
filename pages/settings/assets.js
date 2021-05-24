import SettingsLayout from '@components/settingsLayout';
import SettingsLink from '@components/settingsLink';
import { baseAPI } from '@utils/api';
import { useAuth } from 'contexts/authContext';
import { useEffect, useState } from 'react';

export default function Asset() {
  const { user } = useAuth();
  const [meshes, setMeshes] = useState();
  const [assets, setAssets] = useState();
  const [error, setError] = useState();
  const [changes, setChanges] = useState(new Map());
  const [model, setModel] = useState();

  useEffect(() => {
    const fetchMeshes = async () => {
      try {
        const { data: requestedMeshes } = await baseAPI.get('/meshes');
        setMeshes(requestedMeshes);
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchMeshes();
  }, []);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const { data: requestedModel } = await baseAPI.get(`/users/${user.id}/model`);
        setModel(requestedModel);
        const { data: requestedAssets } = await baseAPI.get(`/models/${requestedModel.id}/assets`);
        setAssets(requestedAssets);
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    if (user) {
      fetchAssets();
    }
  }, [user]);

  const handleSelected = (assetId, meshName) => {
    setChanges(previous => new Map([...previous, [assetId, meshName]]));
  };

  const saveChanges = async () => {
    for await (const [assetId, meshName] of changes.entries()) {
      try {
        await baseAPI.post(`/models/${model.id}/assets/${assetId}/link`, { name: meshName });
      } catch (error) {
        setError(error.response?.data?.message);
      }
    }

    setChanges(new Map());
  };

  return (
    <SettingsLayout modelName={model && model.name} saveDisabled={!changes.size} clicked={saveChanges}>
      {error && <p className="font-semibold text-red-800 mt-4">{error}</p>}
      <div className="flex flex-col ">
        {assets &&
          assets.map((asset, index) => (
            <SettingsLink asset={asset} meshes={meshes} key={index} handleSelected={handleSelected} />
          ))}
      </div>
    </SettingsLayout>
  );
}
