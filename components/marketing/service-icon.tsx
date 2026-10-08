type IconKind = "layout" | "message" | "handover";
const paths: Record<IconKind, string[]> = {
  layout: ["M4 4h16v16H4z", "M4 9h16M10 9v11", "M7 6.5h.01M10 6.5h.01"],
  message: ["M4 5h16v11H9l-5 4V5Z", "M8 9h8M8 12h5"],
  handover: [
    "M3 7h7l2 2h9v11H3V7Z",
    "M3 7V4h8l2 3h6v2",
    "M12 12v5m-2-2 2 2 2-2",
  ],
};
export function ServiceIcon({
  kind,
  className,
}: {
  kind: IconKind;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[kind].map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}
