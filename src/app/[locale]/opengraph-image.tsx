import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "God-Peace AMOUSSOU — Portfolio";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #060609 0%, #101018 100%)",
          color: "#eeedf6",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 120,
            width: 300,
            height: 300,
            borderRadius: 999,
            background: "rgba(124,106,255,0.25)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 100,
            width: 260,
            height: 260,
            borderRadius: 999,
            background: "rgba(77,255,210,0.16)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            border: "1px solid rgba(255,255,255,0.16)",
            borderRadius: 999,
            padding: "10px 28px",
            fontSize: 24,
            color: "#a3a1b8",
            marginBottom: 36,
          }}
        >
          ● God-Peace AMOUSSOU
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.15, textAlign: "center", maxWidth: 900 }}>
          Développeur Web & Ingénieur IoT
        </div>
        <div style={{ fontSize: 30, color: "#a3a1b8", marginTop: 28 }}>
          Web · IoT · Automatisation · Systèmes intelligents
        </div>
      </div>
    ),
    { ...size }
  );
}
