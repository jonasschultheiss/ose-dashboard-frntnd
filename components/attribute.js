export default function Attribute({ name, value }) {
  return (
    <p>
      <span className="font-medium">{name}: </span>
      {value}
    </p>
  );
}
