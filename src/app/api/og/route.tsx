import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get("title");
  const date = searchParams.get("date");
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: 48,
          gap: 32,
          backgroundColor: "#fff",
          fontSize: 40,
        }}
      >
        <div style={{ fontWeight: 700 }}>{title}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            style={{
              objectFit: "cover",
              borderRadius: 8,
              width: 120,
              height: 120,

              marginBottom: 12,
            }}
            src={`${process.env.API_PATH}/blogger.jpg`}
            alt=""
          />
          <div
            style={{
              // position: "absolute",
              // bottom: 38,
              // left: 0,
              // right: 0,
              // display: "flex",
              // justifyContent: "center",
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            @BarrySong97
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 0,
            right: 0,
            justifyContent: "center",
            display: "flex",
            color: "gray",
            fontSize: 14,
            fontWeight: 400,
          }}
        >
          {date}
        </div>
      </div>
    ),
    {
      width: 680,
      height: 340,
    }
  );
}
