import { ImageResponse } from "next/og";

export const alt =
  "Forgn — Applications sur-mesure pour événements · Garantie jour J";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CREAM = "#faf8f4";
const INK = "#0d0c0a";
const MUTED_FG = "#6b665c";
const BORDER = "#e4dfd5";
const EMBER = "#d65d2e";
const EMBER_DEEP = "#8f3612";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: CREAM,
          backgroundImage: `radial-gradient(ellipse at top right, ${EMBER}18 0%, transparent 55%), radial-gradient(ellipse at bottom left, ${EMBER_DEEP}10 0%, transparent 60%)`,
          padding: "72px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: INK,
        }}
      >
        {/* Top bar — wordmark + status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 56,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 56,
                height: 56,
                borderRadius: 14,
                background: INK,
                color: CREAM,
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: -1,
              }}
            >
              F
              <div
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: EMBER,
                  boxShadow: `0 0 18px ${EMBER}`,
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 30,
                fontWeight: 500,
                letterSpacing: -0.5,
              }}
            >
              Forgn
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 16px",
              borderRadius: 999,
              background: `${EMBER}1a`,
              border: `1px solid ${EMBER}33`,
              fontSize: 15,
              fontWeight: 500,
              color: EMBER_DEEP,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: EMBER,
              }}
            />
            Agence · Liège, BE
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 86,
            fontWeight: 500,
            lineHeight: 1.02,
            letterSpacing: -2.5,
            maxWidth: 960,
          }}
        >
          <span style={{ display: "flex" }}>Les applications que vos</span>
          <span style={{ display: "flex", color: EMBER_DEEP, fontStyle: "italic" }}>
            événements
          </span>
          <span style={{ display: "flex" }}>méritent.</span>
        </div>

        {/* Guarantee line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginTop: 40,
            padding: "16px 22px",
            borderRadius: 14,
            background: INK,
            color: CREAM,
            fontSize: 22,
            fontWeight: 500,
            maxWidth: 720,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: EMBER,
            }}
          />
          Garantie jour J · livrée en 2 à 4 semaines
        </div>

        {/* Bottom metrics row */}
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            paddingTop: 48,
            borderTop: `1px solid ${BORDER}`,
            gap: 72,
          }}
        >
          <Metric value="12" label="Applications livrées" />
          <Metric value="12/12" label="Jours J présents" />
          <Metric value="0" label="Bugs en production" accent />
        </div>
      </div>
    ),
    { ...size }
  );
}

function Metric({
  value,
  label,
  accent = false,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div
        style={{
          display: "flex",
          fontSize: 54,
          fontWeight: 500,
          lineHeight: 1,
          letterSpacing: -1.5,
          color: accent ? EMBER : INK,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 16,
          color: MUTED_FG,
          textTransform: "uppercase",
          letterSpacing: 1.5,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}
