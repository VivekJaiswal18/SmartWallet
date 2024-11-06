"use client";

import { useState } from "react";
import { defineChain, getContract } from "thirdweb";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "../client";
import { lineaSepolia, scrollSepoliaTestnet, sepolia } from "thirdweb/chains";
import { NFTClaimer } from "@/components/NFTClaimer";
import { aiachain } from "../components/aiaconfig";

export default function Home() {
  const account = useActiveAccount();

  // Contracts for each chain
  const sepoliaContract = getContract({
    client: client,
    chain: sepolia,
    address: "0xB7B3908cAaC849e15b7b66337B1c78dABf93C10d",
  });
  const lineaContract = getContract({
    client: client,
    chain: lineaSepolia,
    address: "0x209DBE24793004150270FffE2F8644F331e7b2A0",
  });
  const aiaContract = getContract({
    client: client,
    chain: defineChain(aiachain),
    address: "0x2CB6D2d144dC90d1928129260DD24BB9127916F5",
  });

  // State for selected chain
  const [selectedChain, setSelectedChain] = useState("sepolia");

  // Function to handle chain selection
  // @ts-ignore
  const handleChainChange = (event) => {
    setSelectedChain(event.target.value);
  };

  // Function to get the contract based on selected chain
  const getSelectedContract = () => {
    switch (selectedChain) {
      case "sepolia":
        return sepoliaContract;
      case "linea":
        return lineaContract;
      case "aia":
        return aiaContract;
      default:
        return sepoliaContract;
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-10 flex flex-col items-center w-full">
        <div className="flex justify-between items-center w-full mb-10">
          <div className="w-1/3"></div> {/* Spacer */}
          <p className="font-montserrat text-2xl font-semibold text-center flex-1">
            Welcome to SmartWallet
          </p>
          <div className="w-1/3 flex justify-end">
            <ConnectButton
              client={client}
              accountAbstraction={{ chain: defineChain(534351), sponsorGas: true }}
            />
          </div>
        </div>

        <div className="text-center max-w-2xl">
          <p className="mb-2">You are going to perform Multichain Transactions with the same wallet address.</p>
          
          {/* Dropdown to select chain */}
          <div className="mb-6 text-black">
            <label htmlFor="chainSelect" className="mr-4 text-white font-medium">
              Select Chain:
            </label>
            <select
              id="chainSelect"
              value={selectedChain}
              onChange={handleChainChange}
              className="p-2 border rounded"
            >
              <option value="sepolia">Sepolia</option>
              <option value="linea">Linea Sepolia</option>
              <option value="aia">AIA Chain</option>
            </select>
          </div>

          {/* Render NFT Claimer based on selected chain */}
          <NFTClaimer
            recieverAddress={account?.address}
            dropContract={getSelectedContract()}
            tokenId={0n}
          />
        </div>
      </div>
    </main>
  );
}
