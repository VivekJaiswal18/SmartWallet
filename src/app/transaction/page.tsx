"use client"

import { defineChain, getContract } from "thirdweb";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "../client";
import { lineaSepolia, scrollSepoliaTestnet } from "thirdweb/chains";
import { NFTClaimer} from "@/components/NFTClaimer"

export default function Home() {
  const account = useActiveAccount();

  const scrollContract = getContract({
    client: client,
    chain: defineChain(534351),
    address: "0xB8c64a13591a0cE2018EDA17f7fe233CE90177dA"
  });
  const opencampusContract = getContract({
    client: client,
    chain: defineChain(656476),
    address: "0x5765522ee393F157f4C063525720294d22Ee1DD1"
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
        <p className="mb-2 text-xl">Here Both the NFTs are listed on different BlockChains</p>
        <p className="mb-2">MadLad NFT is on Scroll Sepolia Testnet and Car_NFT is on Open Campus</p>
        <p className="mb-2">Here you are getting a SmartWallet</p>
        <p className="mb-2">That can perform Multichain Transactions with the same wallet address.</p>
      
        <div className="flex flex-row">
        <NFTClaimer
          recieverAddress={account?.address}
          dropContract={scrollContract}
          tokenId={0n}
        />
        <div className="h-auto w-[1px] bg-gray-600 mx-12 mt-8"/>
        <NFTClaimer
        recieverAddress={account?.address}
        dropContract={opencampusContract}
        tokenId={0n}/>
        </div>
        </div>
      </div>
    </main>
  );
}

