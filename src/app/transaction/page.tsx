"use client"

import { defineChain, getContract } from "thirdweb";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "../client";
import { lineaSepolia, scrollSepoliaTestnet, sepolia, } from "thirdweb/chains";
import { NFTClaimer} from "@/components/NFTClaimer"
import {aiachain} from "../components/aiaconfig"

export default function Home() {
  const account = useActiveAccount();

  const sepoliaContract = getContract({
    client: client,
    chain: sepolia,
    address: "0xB7B3908cAaC849e15b7b66337B1c78dABf93C10d"
  });
  const lineaContract = getContract({
    client: client,
    chain: lineaSepolia,
    address: "0x209DBE24793004150270FffE2F8644F331e7b2A0"
  })
  const aiaContract = getContract({
    client: client,
    // chain: defineChain(1320),
    chain: defineChain(aiachain),
    address: "0x2CB6D2d144dC90d1928129260DD24BB9127916F5"
  })


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
        {/* <p className="mb-2 text-xl">Here Both the NFTs are listed on different BlockChains</p>
        <p className="mb-2">MadLad NFT is on Sepolia Testnet and Car NFT is on Linea Sepolia</p>
        <p className="mb-2">Here you are getting a SmartWallet</p> */}
        {/* <p className="mb-2">That will perform Multichain Transactions with the same wallet address.</p> */}
        <p className="mb-2">You are going to perform Multichain Transactions with the same wallet address.</p>
      
        <div className="flex flex-row">
        <NFTClaimer
          recieverAddress={account?.address}
          dropContract={sepoliaContract}
          tokenId={0n}
        />
        <div className="h-auto w-[2px] bg-gray-600 mx-12 mt-8"/>
        <NFTClaimer
        recieverAddress={account?.address}
        dropContract={lineaContract}
        tokenId={0n}/>
        <div className="h-auto w-[1px] bg-gray-600 mx-12 mt-8"/>
        <NFTClaimer
        recieverAddress={account?.address}
        dropContract={aiaContract}
        tokenId={0n}/>
        </div>
        </div>
      </div>
    </main>
  );
}

