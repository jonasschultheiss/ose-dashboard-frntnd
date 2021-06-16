import MapChartControls from '@components/mapChartControls';
import { baseAPI } from '@utils/api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Graticule, Marker, Sphere, ZoomableGroup } from 'react-simple-maps';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const MapChart = ({ setTooltipContent }) => {
  const [models, setModels] = useState([]);
  const router = useRouter();
  const initialPosition = { coordinates: [0, 30], zoom: 1 };
  const [position, setPosition] = useState(initialPosition);
  const [resetEnabled, setResetEnabled] = useState(false);

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
    setResetEnabled(true);
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
    setResetEnabled(true);
  };

  const handleMoveEnd = position => {
    setPosition(position);
    setResetEnabled(
      position.coordinates[0] !== initialPosition.coordinates[0] ||
        position.coordinates[1] !== initialPosition.coordinates[1] ||
        position.zoom !== initialPosition.zoom
    );
  };

  const handleReset = () => {
    setPosition({ coordinates: [0, 30], zoom: 1 });
    setResetEnabled(false);
  };

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
    <div className="relative rounded">
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0]
        }}
        height={300}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
          minZoom={1}
          maxZoom={4}
        >
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
                  data-for="foo"
                  data-tip={<span>model.name</span>}
                  onClick={() => handleModelSelection(model)}
                  key={index}
                  coordinates={[model.location.lng, model.location.lat]}
                  onMouseLeave={() => setTooltipContent('')}
                  onMouseEnter={() => setTooltipContent(model.name)}
                >
                  <g fill="#FF5533" strokeLinecap="round" strokeLinejoin="round">
                    <circle r={5 - position.zoom} />
                  </g>
                </Marker>
              );
            })}
        </ZoomableGroup>
      </ComposableMap>
      <MapChartControls
        resetClicked={() => handleReset()}
        resetEnabled={resetEnabled}
        zoomIn={handleZoomIn}
        zoomOut={handleZoomOut}
      />
    </div>
  );
};

export default MapChart;
