import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  console.log("Inside Register Success");
  console.log(body);
  const { isValid } = await getFrameMessage(body);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: "View transaction",
          action: "link",
          target: `https://testnet.axelarscan.io/gmp/${body?.untrustedData?.transactionId}`,
        },
        {
          label: "Bridge Token",
          action: "post",
          target: `http://localhost:3000/api/actions/deploy-token`,
        },
      ],
      image: {
        src: `http://localhost:3000/result-frame.png`,
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
