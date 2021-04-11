import RegisterNavElement from './registerNavElement';

export default function RegisterNav({ stages, currentStage }) {
  return (
    <div className="w-full flex flex-col mb-12">
      <div className="w-full h-1 bg-gray-900"></div>
      <div className="w-full flex flex-row justify-between">
        {stages.map((stage, index) => (
          <RegisterNavElement key={index} index={index} stage={stage} currentStage={currentStage} />
        ))}
      </div>
    </div>
  );
}
