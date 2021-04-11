import SettingsLayout from '@components/settingsLayout';
import { baseAPI } from '@utils/api';
import { useEffect, useState } from 'react';

export default function Asset() {
  const [meshes, setMeshes] = useState();
  const [error, setError] = useState();

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

  return (
    <SettingsLayout>
      {error && <p className="font-semibold text-red-800 mt-4">{error}</p>}
      <p>{meshes?.length}</p>
    </SettingsLayout>
  );
}
