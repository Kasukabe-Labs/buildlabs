"use client";

import { useAuth } from "@clerk/nextjs";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";
import axios from "axios";
import React, { useEffect } from "react";
import { Button } from "./ui/button";

export default function ConnectWallet() {
  const { publicKey, connected } = useWallet();
  const { getToken } = useAuth();

  async function addPublicKeyToUserDB(publicKey: string) {
    try {
      const token = await getToken();
      const res = await axios.post(
        "http://localhost:8000/api/v1/addPublicKey",
        {
          public_key: publicKey,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        alert("Public key added to db");
        console.log(`Public key added to db: ${publicKey}`);
      }
    } catch (error) {
      console.error("Public key add error:", error);
    }
  }

  if (!publicKey) {
    return (
      <div className="w-[300px] flex flex-col justify-center items-center">
        <WalletMultiButton />
        <Button onClick={() => addPublicKeyToUserDB(publicKey!.toString())}>
          Add to db
        </Button>
      </div>
    );
  }

  return (
    <div className="w-[300px] flex flex-col justify-center items-center">
      <WalletDisconnectButton />
      <Button onClick={() => addPublicKeyToUserDB(publicKey!.toString())}>
        Add to db
      </Button>
    </div>
  );
}
