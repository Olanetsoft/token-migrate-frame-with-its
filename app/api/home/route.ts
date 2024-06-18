import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  return new NextResponse(
    getFrameHtmlResponse({
      input: {
        text: "Enter token Address",
      },
      buttons: [
        {
          action: "post",
          label: "Register as Interchain Token",
          target: "http://localhost:3000/api/middleware/select-chain",
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
