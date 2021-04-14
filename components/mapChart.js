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
              return <Geography key={geo.rsmKey} geography={geo} fill="#E4E5E6" className="focus:outline-none" />;
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
                <div className="w-8 h-8 bg-pink-300"></div>
                <circle r={4} fill="#F53" />
              </Marker>
            );
          })}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default MapChart;
