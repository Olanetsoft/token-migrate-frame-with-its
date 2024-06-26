import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseEther } from "viem";
import { baseSepolia } from "viem/chains";
import InterchainTokenServiceABI from "../../../contracts/InterchainTokenServiceABI";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";

const INTERCHAIN_TOKEN_SERVICE_ADDRESS =
  "0xB5FB4BE02232B1bBA4dC8f81dc24C26980dE9e3C";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  try {
    const body = await req.json();

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

    let parsedState: {
      tokenAddress: string;
      tokenId: string;
      amount: string;
      receiverAddress: string;
    };
    try {
      parsedState = JSON.parse(decodedState);
    } catch (error) {
      console.error("Error parsing serialized state:", error);
      return NextResponse.json(
        { error: "Invalid serialized state" },
        { status: 400 }
      );
    }

    const { tokenAddress, tokenId, amount, receiverAddress } = parsedState;

    if (!/^0x[0-9a-fA-F]{40}$/.test(tokenAddress)) {
      console.error("Invalid token address format:", tokenAddress);
      return NextResponse.json(
        { error: "Invalid token address format" },
        { status: 400 }
      );
    }

    if (!/^0x[0-9a-fA-F]{40}$/.test(receiverAddress)) {
      console.error("Invalid receiver address format:", receiverAddress);
      return NextResponse.json(
        { error: "Invalid token address format" },
        { status: 400 }
      );
    }
    const amountInUnits = parseEther(amount);
    const emptyMetadata: `0x${string}` =
      "0x0000000000000000000000000000000000000000000000000000000000000000";

    const data = encodeFunctionData({
      abi: InterchainTokenServiceABI,
      functionName: "interchainTransfer",
      args: [
        tokenId as `0x${string}`,
        "optimism-sepolia",
        receiverAddress as `0x${string}`,
        BigInt(amountInUnits),
        emptyMetadata,
        parseEther("0.001"),
      ],
    });

    const txData: FrameTransactionResponse = {
      chainId: `eip155:${baseSepolia.id}`,
      method: "eth_sendTransaction",
      params: {
        abi: [],
        data,
        to: INTERCHAIN_TOKEN_SERVICE_ADDRESS,
        value: parseEther("0.0006").toString(),
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
