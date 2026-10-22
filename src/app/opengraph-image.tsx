import { ImageResponse } from "next/og";
export const alt = "Pratham Dagli — Engineer & Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#161616",
        color: "#e8e5dd",
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
          color: "#a3a09b",
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
        <span style={{ fontSize: 118 }}>PRATHAM</span>
        <span style={{ color: "#a3a09b", fontSize: 118 }}>DAGLI.</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "auto",
          borderTop: "1px solid #3b3a37",
          paddingTop: 25,
          fontSize: 22,
          color: "#a3a09b",
        }}
      >
        AI / ML · FULL-STACK DEVELOPMENT · PDEU
      </div>
    </div>,
    size,
  );
}
