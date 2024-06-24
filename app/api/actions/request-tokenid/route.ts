import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, getContract, http } from "viem";
import InterchainTokenFactoryABI from "../../../contracts/InterchainTokenFactoryABI";
import { baseSepolia } from "viem/chains";

const INTERCHAIN_TOKEN_FACTORY_ADDRESS =
  "0x83a93500d23Fbc3e82B410aD07A6a9F7A0670D66";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  console.log("Token ID retrieval Frame");

  let decodedState: string;
  try {
    decodedState = decodeURIComponent(body.untrustedData.state);
  } catch (error) {
    console.error("Error decoding state:", error);
    return NextResponse.json(
      { error: "Invalid state format" },
      { status: 400 }
    );
  }

  // Parse the decoded state
  let parsedState: { tokenAddress: string };
  try {
    parsedState = JSON.parse(decodedState);
  } catch (error) {
    console.error("Error parsing serialized state:", error);
    return NextResponse.json(
      { error: "Invalid serialized state" },
      { status: 400 }
    );
  }

  const { tokenAddress } = parsedState;

  if (!/^0x[0-9a-fA-F]{40}$/.test(tokenAddress)) {
    console.error("Invalid token address format:", tokenAddress);
    return NextResponse.json(
      { error: "Invalid token address format" },
      { status: 400 }
    );
  }

  console.log(tokenAddress);

  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });

  const baseSepoliaContract = getContract({
    address: INTERCHAIN_TOKEN_FACTORY_ADDRESS,
    abi: InterchainTokenFactoryABI,
    client: publicClient,
  });

  const tokenId = await baseSepoliaContract.read.canonicalInterchainTokenId([
    tokenAddress as `0x${string}`,
  ]);

  console.log("Token ID", tokenId);
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: "post",
          label: "Next >>",
          target:
            "https://token-migrate-frame-with-its.vercel.app/api/actions/start-transfer/amount",
        },
      ],
      image: `https://token-migrate-frame-with-its.vercel.app/images/result.png`,
      postUrl:
        "https://token-migrate-frame-with-its.vercel.app/api/actions/start-transfer/amount",
      state: {
        tokenAddress: tokenAddress,
        tokenId: tokenId,
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
