export default function Emoji({ emoji, a11yDescription }) {
  return (
    <span role="img" aria-label={a11yDescription}>
      {emoji}
    </span>
  );
}
