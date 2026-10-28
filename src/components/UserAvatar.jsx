// Inline SVG avatar (no network request) built from the user's initial.
const makeAvatar = (name = "U") => {
  const initial = (name.trim()[0] || "U").toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="#465fff"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="36" fill="#fff">${initial}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export default function UserAvatar({ name, size = 40 }) {
  return <img src={makeAvatar(name)} alt={`${name || "User"} avatar`} width={size} height={size} className="rounded-full object-cover" style={{ width: size, height: size }} />;
}
