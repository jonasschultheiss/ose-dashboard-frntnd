export default function Asset(properties) {
  const { material, geometry, position, rotation, scale, id, assetSelected } = properties;

  return (
    <>
      <mesh
        onPointerUp={() => {
          assetSelected(id);
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
