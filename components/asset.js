export default function Asset(properties) {
  const { position, rotation, meshName, assetSelected, children, userData } = properties;

  return (
    <>
      <group
        onPointerUp={() => {
          assetSelected(meshName);
        }}
        position={position}
        rotation={rotation}
        userData={userData}
      >
        {children}
      </group>
    </>
  );
}
