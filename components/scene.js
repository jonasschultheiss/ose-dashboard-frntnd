import Lights from '@components/lights';
import dynamic from 'next/dynamic';
import { lazy, Suspense } from 'react';
import { Canvas } from 'react-three-fiber';

const Model = lazy(() => import('@components/model'));

const OrbitControls = dynamic(
  import('@react-three/drei').then(module => module.OrbitControls),
  { ssr: false }
);

const Environment = dynamic(
  import('@react-three/drei').then(module => module.Environment),
  { ssr: false }
);

export default function Scene({ assetSelected }) {
  return (
    <div className="absolute w-screen h-screen">
      <Canvas colorManagement camera={{ position: [2, 1.5, 1], fov: 70 }}>
        <Lights />
        <OrbitControls />
        <group>
          <Suspense fallback={''}>
            <Environment files={'background.hdr'} />
            <Model assetSelected={assetSelected} position={[0, -1, 0.3]} />
          </Suspense>
        </group>
      </Canvas>
    </div>
  );
}
