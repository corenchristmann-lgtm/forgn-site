const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'><filter id='n' x='0' y='0'><feTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.85  0 0 0 0 0.85  0 0 0 0 0.85  0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`;

export default function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2] mix-blend-overlay opacity-[0.04]"
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,${NOISE_SVG}")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}
