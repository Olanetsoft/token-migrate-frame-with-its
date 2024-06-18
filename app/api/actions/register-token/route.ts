import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData } from "viem";
import { baseSepolia, optimismSepolia, sepolia } from "viem/chains";
import InterchainTokenFactoryABI from "../../../contracts/InterchainTokenFactoryABI";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";

const INTERCHAIN_TOKEN_FACTORY_ADDRESS =
  "0x83a93500d23Fbc3e82B410aD07A6a9F7A0670D66";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  try {
    console.log("Register Token Action");

    const body = await req.json();
    console.log(body);

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

    let parsedState: { tokenAddress: string; chainName: string };
    try {
      parsedState = JSON.parse(decodedState);
    } catch (error) {
      console.error("Error parsing serialized state:", error);
      return NextResponse.json(
        { error: "Invalid serialized state" },
        { status: 400 }
      );
    }

    const { tokenAddress, chainName } = parsedState;

    if (!/^0x[0-9a-fA-F]{40}$/.test(tokenAddress)) {
      console.error("Invalid token address format:", tokenAddress);
      return NextResponse.json(
        { error: "Invalid token address format" },
        { status: 400 }
      );
    }

    const data = encodeFunctionData({
      abi: InterchainTokenFactoryABI,
      functionName: "registerCanonicalInterchainToken",
      args: [tokenAddress as `0x${string}`],
    });

    const chainMap: { [key: string]: number } = {
      "base-sepolia": baseSepolia.id,
      "optimism-sepolia": optimismSepolia.id,
      "ethereum-sepolia": sepolia.id,
    };

    const chainId = chainMap[chainName];
    if (!chainId) {
      return NextResponse.json(
        { error: "Invalid chain selected" },
        { status: 400 }
      );
    }

    const txData: FrameTransactionResponse = {
      chainId: `eip155:${chainId}`,
      method: "eth_sendTransaction",
      params: {
        abi: [],
        data,
        to: INTERCHAIN_TOKEN_FACTORY_ADDRESS,
        value: "0x0",
      },
    };

    return NextResponse.json(txData);
  } catch (error) {
    console.error("Error in getResponse:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
