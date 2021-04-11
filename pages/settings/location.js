import LocationInput from '@components/locationInput';
import SettingsLayout from '@components/settingsLayout';
import { baseAPI } from '@utils/api';
import { useAuth } from 'contexts/authContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Location() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [address, setAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState();
  const [locations, setLocations] = useState();
  const [model, setModel] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchModel = async () => {
      setIsLoading(true);
      try {
        const { data: fetchedUser } = await baseAPI.get(`/users/${user.id}/model`);
        const { model: requestedModel } = fetchedUser;
        setModel(requestedModel);
        const { data: requestedLocation } = await baseAPI.get(`/models/${requestedModel.id}/location`);
        setSelectedLocation(requestedLocation);
        setAddress(requestedLocation.title);
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

  const imageUrl = `${baseUrl}/mapview?long=${selectedLocation?.position?.lng}&lat=${selectedLocation?.position?.lat}`;

  const handleAddressChanged = async event => {
    setAddress(event.target.value);

    const { data } = await baseAPI.get(`/geolocation?q=${encodeURI(event.target.value)}`);
    setLocations(data.items.slice(0, 10));
    if (selectedLocation) {
      setButtonDisabled(false);
    }
  };

  const handleLocationSelected = location => {
    setLocations([]);
    setAddress(location.title);
    setSelectedLocation(location);
  };

  const saveSettings = async () => {
    setIsLoading(true);
    try {
      const { data: requestedModel } = baseAPI.patch(`/models/${model.id}`, { location: selectedLocation.id });
      setModel(requestedModel);
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <SettingsLayout saveDisabled={buttonDisabled} clicked={saveSettings}>
      <div className="relative w-full h-48 mb-2">
        <Image
          src={imageUrl}
          alt="MapView of the entered address"
          layout="fill"
          objectFit="cover"
          priority="true"
          className="rounded-md"
        />
      </div>
      {error && <p className="font-semibold text-red-800 mt-4">{error}</p>}
      <LocationInput
        locations={locations}
        locationSelected={handleLocationSelected}
        label="Location"
        changed={handleAddressChanged}
        value={address}
        placeholder="Please enter the address of your model"
        disabled={isLoading}
      />
    </SettingsLayout>
  );
}
