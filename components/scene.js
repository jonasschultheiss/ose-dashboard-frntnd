import Lights from '@components/lights';
import dynamic from 'next/dynamic';
import { lazy, Suspense } from 'react';
import { Canvas } from 'react-three-fiber';

const Model = lazy(() => import('@components/model'));
const OrbitControls = dynamic(
  import('@react-three/drei').then((module) => module.OrbitControls),
  { ssr: false }
);

export default function Scene({ assetSelected }) {
  return (
    <div className="h-screen w-screen absolute">
      <Canvas colorManagement shadowMap camera={{ position: [15, 15, 17], fov: 70 }}>
        <Lights />
        <OrbitControls />
        <group>
          <Suspense fallback={null}>
            <Model assetSelected={assetSelected} position={[0, -8, 5]} />
          </Suspense>
        </group>
      </Canvas>
    </div>
  );
}
