export default function ControlButton({ clicked, children }) {
  return (
    <button
      onClick={() => clicked()}
      className="py-1 px-2 mt-2 text-base font-medium text-gray-100 bg-gray-900 rounded-md focus:outline-none
flex flex-row justify-center border-2 border-gray-300"
    >
      {children}
    </button>
  );
}
