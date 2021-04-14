export default function RegisterNavElement({ stage, currentStage, index }) {
  let backgroundClasses = 'w-full rounded-b-md';
  let textClasses = 'text-center text-lg font-semibold';
  if (stage === currentStage) {
    backgroundClasses += ' bg-gray-900';
    textClasses += ' text-gray-300';
  } else {
    backgroundClasses += ' bg-gray-300';
    textClasses += ' text-gray-900';
  }

  return (
    <div className={backgroundClasses}>
      <p className={textClasses}>{`${index + 1}. ${stage}`}</p>
    </div>
  );
}
