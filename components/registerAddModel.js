import Button from '@components/button';
import InputField from '@components/inputField';
import LocationInput from '@components/locationInput';
import { baseAPI } from '@utils/api';
import useDefaultLocation from '@utils/useDefaultLocation';
import Image from 'next/image';
import { useState } from 'react';
import Loader from 'react-loader-spinner';

export default function RegisterAddModel({ done }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const defaultLocation = useDefaultLocation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation);
  const [locations, setLocations] = useState();
  const [model, setModel] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleNameChanged = event => {
    setName(event.target.value);
    enableButtonIfDataProvided();
  };

  const handleDescriptionChanged = event => {
    setDescription(event.target.value);
    enableButtonIfDataProvided();
  };

  const handleLocationSelected = location => {
    setLocations([]);
    setAddress(location.title);
    setSelectedLocation(location);
  };

  const handleAddressChanged = async event => {
    setAddress(event.target.value);

    const { data } = await baseAPI.get(`/geolocation?q=${encodeURI(event.target.value)}`);
    setLocations(data.items.slice(0, 3));
    enableButtonIfDataProvided();
  };

  const enableButtonIfDataProvided = () => {
    if (name && description && selectedLocation) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const addModel = async () => {
    setIsLoading(true);
    try {
      const { data: model } = await baseAPI.post('/models/', { name, description, location: selectedLocation.id });
      setIsLoading(false);
      setModel(model);
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message);
    }
  };

  const handleButtonClicked = () => {
    if (model) {
      done(model);
    } else {
      addModel();
    }
  };

  const imageUrl = `${baseUrl}/mapview?long=${selectedLocation.position.lng}&lat=${selectedLocation.position.lat}`;

  return (
    <>
      {isLoading && <Loader className="mb-4" type="Grid" width="60" height="60" color="#171717" />}
      <h1 className="text-gray-900 font-semibold text-xl text-center">Add your model</h1>
      <div className="relative w-full h-48 my-4">
        <Image
          src={imageUrl}
          alt="MapView of the entered address"
          layout="fill"
          objectFit="cover"
          priority="true"
          className="rounded-md"
        />
      </div>
      <p className="mt-4 text-gray-900 text-lg text-center">
        We need additional information about your model. Please add it below.
      </p>
      {error && <p className="font-semibold text-red-800 mt-4">{error}</p>}
      <LocationInput
        locations={locations}
        locationSelected={handleLocationSelected}
        label="Location"
        changed={handleAddressChanged}
        value={address}
        placeholder="Please enter the address of your model"
        disabled={isLoading || model}
      />
      <InputField
        label="Name"
        changed={handleNameChanged}
        value={name}
        placeholder="Please name your model"
        disabled={isLoading || model}
      />
      <InputField
        label="Description"
        changed={handleDescriptionChanged}
        value={description}
        placeholder="Please add a short description to your model"
        disabled={isLoading || model}
      />
      <Button clicked={handleButtonClicked} arrowRight={!!model} fullWidth disabled={buttonDisabled}>
        {model ? 'Automatic asset linking' : 'Add model'}
      </Button>
    </>
  );
}
