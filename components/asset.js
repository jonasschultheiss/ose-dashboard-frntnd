export default function Asset(properties) {
  const { material, geometry, position, rotation, scale, meshName, assetSelected } = properties;

  return (
    <>
      <mesh
        onPointerUp={() => {
          assetSelected(meshName);
        }}
        material={material}
        geometry={geometry}
        position={position}
        rotation={rotation}
        scale={scale}
      />
    </>
  );
}
