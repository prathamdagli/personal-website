import { ImageResponse } from "next/og";
export const alt = "Pratham Dagli — Turning ideas into intelligent experiences";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#111318",
        color: "#f2f3f5",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "65px 75px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 18,
          color: "#a0a6b2",
          letterSpacing: 3,
        }}
      >
        <span>PRATHAM DAGLI</span>
        <span>ENGINEER & BUILDER</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 88,
          lineHeight: 1.08,
          letterSpacing: -5,
          marginTop: 65,
        }}
      >
        <span>Turning ideas into</span>
        <span style={{ color: "#abc4ed" }}>intelligent experiences.</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "auto",
          borderTop: "1px solid #303540",
          paddingTop: 25,
          fontSize: 22,
          color: "#a0a6b2",
        }}
      >
        Applied AI · Full-stack development · Endless curiosity
      </div>
    </div>,
    size,
  );
}
