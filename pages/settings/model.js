import InputField from '@components/inputField';
import SettingsLayout from '@components/settingsLayout';
import { baseAPI } from '@utils/api';
import { useAuth } from 'contexts/authContext';
import { useEffect, useState } from 'react';

export default function Model() {
  const [model, setModel] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [shouldButtonBeDisabled, setShouldButtonBeDisabled] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchModel = async () => {
      setIsLoading(true);
      try {
        const { data: fetchedUser } = await baseAPI.get(`/users/${user?.id}/model`);
        const { model: requestedModel } = fetchedUser;
        setModel(requestedModel);
        setName(requestedModel.name);
        setDescription(requestedModel.description);
        setIsLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setIsLoading(false);
      }
    };

    if (user) {
      fetchModel();
    }
  }, [user]);

  const enableButtonIfDataProvided = () => {
    if (name && description) {
      setShouldButtonBeDisabled(false);
    } else {
      setShouldButtonBeDisabled(true);
    }
  };

  const handleNameChanged = event => {
    setName(event.target.value);
    enableButtonIfDataProvided();
  };

  const handleDescriptionChanged = event => {
    setDescription(event.target.value);
    enableButtonIfDataProvided();
  };

  const saveSettings = async () => {
    setIsLoading(true);
    try {
      const { data: requestedModel } = baseAPI.patch(`/models/${model.id}`, { name, description });
      setModel(requestedModel);
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <SettingsLayout saveDisabled={shouldButtonBeDisabled} clicked={saveSettings}>
      {error ? <p className="font-semibold text-red-800 mt-4">{error}</p> : undefined}
      <InputField
        label="Name"
        changed={handleNameChanged}
        value={name}
        placeholder="Please name your model"
        disabled={isLoading}
      />
      <InputField
        label="Description"
        changed={handleDescriptionChanged}
        value={description}
        placeholder="Please add a short description to your model"
        disabled={isLoading}
      />
    </SettingsLayout>
  );
}
