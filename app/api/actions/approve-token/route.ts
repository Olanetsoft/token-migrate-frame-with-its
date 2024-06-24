import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseEther } from "viem";
import { baseSepolia } from "viem/chains";
import Erc20ABI from "../../../contracts/Erc20ABI";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";

const INTERCHAIN_TOKEN_SERVICE_ADDRESS =
  "0xB5FB4BE02232B1bBA4dC8f81dc24C26980dE9e3C";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  try {
    console.log("Approve Token Action");

    const body = await req.json();
    console.log(body);

    const receiverAddress = body.untrustedData.inputText;

    console.log(receiverAddress);

    let decodedState: string;
    try {
      decodedState = decodeURIComponent(body.untrustedData.state);
      console.log(decodedState);
    } catch (error) {
      console.error("Error decoding state:", error);
      return NextResponse.json(
        { error: "Invalid state format" },
        { status: 400 }
      );
    }

    console.log("Done decoding");
    let parsedState: {
      tokenAddress: string;
      tokenId: string;
      amount: string;
    };
    try {
      parsedState = JSON.parse(decodedState);
      console.log(parsedState);
    } catch (error) {
      console.error("Error parsing serialized state:", error);
      return NextResponse.json(
        { error: "Invalid serialized state" },
        { status: 400 }
      );
    }

    console.log("Done parsed");
    const { tokenAddress, tokenId, amount } = parsedState;

    console.log("token address: ", tokenAddress);
    console.log("Token Id", tokenId);
    console.log("Amount", amount);
    console.log("ITS", INTERCHAIN_TOKEN_SERVICE_ADDRESS);

    if (!/^0x[0-9a-fA-F]{40}$/.test(tokenAddress)) {
      console.error("Invalid token address format:", tokenAddress);
      return NextResponse.json(
        { error: "Invalid token address format" },
        { status: 400 }
      );
    }

    console.log("encode function data");
    const data = encodeFunctionData({
      abi: Erc20ABI,
      functionName: "approve",
      args: [
        INTERCHAIN_TOKEN_SERVICE_ADDRESS as `0x${string}`,
        parseEther(amount),
      ],
    });

    console.log("TXN start");

    console.log(data);
    const txData: FrameTransactionResponse = {
      chainId: `eip155:${baseSepolia.id}`,
      method: "eth_sendTransaction",
      params: {
        abi: [],
        data,
        to: tokenAddress as `0x${string}`,
        value: parseEther("0.0006").toString(),
      },
    };
    console.log("return result");

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
