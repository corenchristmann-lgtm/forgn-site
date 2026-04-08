import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Forgn — Des systèmes qui travaillent pendant que vous dormez";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#08070b",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#8b5cf6",
              letterSpacing: -2,
            }}
          >
            Forgn
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: "#e8e6ef",
              textAlign: "center",
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Des systèmes qui travaillent
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: "#fbbf24",
              textAlign: "center",
            }}
          >
            pendant que vous dormez
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#8a879a",
              marginTop: 16,
            }}
          >
            Automatisation sur mesure pour agences marketing
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
