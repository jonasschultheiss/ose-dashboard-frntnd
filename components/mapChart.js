import { baseAPI } from '@utils/api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Graticule, Marker, Sphere, ZoomableGroup } from 'react-simple-maps';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const MapChart = () => {
  const [models, setModels] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchModels = async () => {
      const { data: requestedModels } = await baseAPI.get('/models');
      for await (const requestedModel of requestedModels) {
        const { data: location } = await baseAPI.get(`/models/${requestedModel.id}/location`);
        requestedModel.location = location?.position;
      }
      setModels(requestedModels);
    };

    fetchModels();
  }, []);

  const handleModelSelection = selectedModel => {
    router.push(`/models/${selectedModel.id}`);
  };

  return (
    <ComposableMap
      width={1920}
      height={1080}
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 300
      }}
    >
      <ZoomableGroup className="w-full" zoom={1}>
        <Sphere stroke="#232323" strokeWidth={2} />
        <Graticule stroke="#232323" strokeWidth={2} />

        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#E4E5E6"
                  stroke="#232323"
                  strokeWidth="0.3"
                  className="focus:outline-none"
                />
              );
            })
          }
        </Geographies>
        {models &&
          models.map((model, index) => {
            return (
              <Marker
                onClick={() => handleModelSelection(model)}
                key={index}
                coordinates={[model.location.lng, model.location.lat]}
              >
                <g
                  fill="none"
                  stroke="#FF5533"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="translate(-12, -24)"
                >
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                </g>
              </Marker>
            );
          })}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default MapChart;
