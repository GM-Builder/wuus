import { ImageResponse } from "next/og";

export const alt = "WUUS — Independent web design studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function SocialPreview() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          background: "#1c2e43",
          color: "#ffffff",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 36,
            fontWeight: 700,
          }}
        >
          WUUS
          <span
            style={{
              width: 8,
              height: 8,
              marginLeft: 8,
              borderRadius: 4,
              background: "#e49a18",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 72,
            lineHeight: 1.1,
            fontWeight: 700,
            letterSpacing: -3,
          }}
        >
          <span>Clear websites.</span>
          <span style={{ color: "#f6cf83" }}>Personal attention.</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#f6cf83",
          }}
        >
          <span>Independent web design studio</span>
          <span>webuntukusaha.com</span>
        </div>
      </div>
    ),
    size,
  );
}
