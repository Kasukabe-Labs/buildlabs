"use client";

import AddNewProject from "@/components/AddNewProject";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

import "@solana/wallet-adapter-react-ui/styles.css";
import ConnectWallet from "@/components/ConnectWallet";

export default function Home() {
  const { getToken } = useAuth();

  const network = WalletAdapterNetwork.Devnet;
  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], [network]);

  const fetchProtection = async () => {
    const token = await getToken();
    console.log("------------TOKEN-----------", token);
    fetch("http://localhost:8000/api/v1/protected", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const fetchProfile = async () => {
    const token = await getToken();

    console.log("------------PROFILE-----------", token);
    fetch("http://localhost:8000/api/v1/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const fetchAllProjects = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/projects");
      console.log(res.data);
    } catch (error) {
      console.log("Error in fetch all projects" + error);
    }
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="fullScreen space-y-6">
            <Button onClick={fetchProtection}>Fetch Protected</Button>
            <Button onClick={fetchProfile}>Fetch Profile</Button>
            <Button onClick={fetchAllProjects}>Fetch All Projects</Button>

            <ConnectWallet />

            <AddNewProject />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
