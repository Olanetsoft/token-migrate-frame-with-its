import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  console.log("Select a chain screen");

  const body = await req.json();
  console.log(body);

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: "post",
          label: "Ethereum",
        },
        {
          action: "post",
          label: "Optimism",
        },
        {
          action: "post",
          label: "Base",
        },
      ],
      image: "http://localhost:3000/images/result.png",
      postUrl: "http://localhost:3000/api/middleware/select-chain",
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
