export default function Asset(props) {
  const { material, geometry, position, rotation, scale, id, assetSelected } = props;

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
