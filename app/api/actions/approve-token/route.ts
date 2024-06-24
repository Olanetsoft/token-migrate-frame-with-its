import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseUnits } from "viem";
import { baseSepolia } from "viem/chains";
import Erc20ABI from "../../../contracts/Erc20ABI";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";
import { ethers } from "ethers";

const INTERCHAIN_TOKEN_SERVICE_ADDRESS =
  "0xB5FB4BE02232B1bBA4dC8f81dc24C26980dE9e3C";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  try {
    console.log("Approve Token Action");

    const body = await req.json();
    console.log(body);

    const receiverAddress = body.untrustedData.inputText;
    console.log("Receiver Address:", receiverAddress);

    let decodedState: string;
    try {
      decodedState = decodeURIComponent(body.untrustedData.state);
      console.log("Decoded State:", decodedState);
    } catch (error) {
      console.error("Error decoding state:", error);
      return NextResponse.json(
        { error: "Invalid state format" },
        { status: 400 }
      );
    }

    let parsedState: { tokenAddress: string; tokenId: string; amount: string };
    try {
      parsedState = JSON.parse(decodedState);
      console.log("Parsed State:", parsedState);
    } catch (error) {
      console.error("Error parsing serialized state:", error);
      return NextResponse.json(
        { error: "Invalid serialized state" },
        { status: 400 }
      );
    }

    const { tokenAddress, tokenId, amount } = parsedState;
    console.log("Token Address:", tokenAddress);
    console.log("Token Id:", tokenId);
    console.log("Amount:", amount);
    console.log("ITS Address:", INTERCHAIN_TOKEN_SERVICE_ADDRESS);

    if (!/^0x[0-9a-fA-F]{40}$/.test(tokenAddress)) {
      console.error("Invalid token address format:", tokenAddress);
      return NextResponse.json(
        { error: "Invalid token address format" },
        { status: 400 }
      );
    }

    // Convert amount to smallest unit as bigint
    const amountInUnits = ethers.parseEther(amount);
    console.log("Amount in Units (BigInt):", amountInUnits);

    console.log("Encode function data");
    const data = encodeFunctionData({
      abi: Erc20ABI,
      functionName: "approve",
      args: [INTERCHAIN_TOKEN_SERVICE_ADDRESS, amountInUnits],
    });

    console.log("Transaction data:", data);

    const txData: FrameTransactionResponse = {
      chainId: `eip155:${baseSepolia.id}`,
      method: "eth_sendTransaction",
      params: {
        abi: [],
        data,
        to: tokenAddress as `0x${string}`,
        value: "0x0", // Ensuring value is correct
      },
    };

    console.log("Transaction to be sent:", txData);

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
