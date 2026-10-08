/** The original WUUS artwork, framed without its large transparent margins. */
export function BrandArtwork({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="120 400 860 260"
      aria-hidden="true"
      focusable="false"
    >
      <image href="/logo-tanpa-bg.png" width="1080" height="1080" />
    </svg>
  );
}
