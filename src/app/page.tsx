"use client"

import { defineChain, getContract } from "thirdweb";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "./client";
import { lineaSepolia } from "thirdweb/chains";
import { NFTClaimer} from "@/components/NFTClaimer"

export default function Home() {
  const account = useActiveAccount();

  const lineaContract = getContract({
    client: client,
    chain: defineChain(lineaSepolia),
    address: "0x9d28Ac49C6d3289c1015b62DCC6159F74d51ed31"
  });
  const opencampusContract = getContract({
    client: client,
    chain: defineChain(656476),
    address: "0x5765522ee393F157f4C063525720294d22Ee1DD1"
  })


  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <h1>UniWallet</h1>
        <h1>A MultiChain Wallet</h1>
        <h2>Here Both the NFTs are listed on different BlockChains </h2>
        <h2>Car_NFT is on Open Campus And Cosmos_NFT is on Linea Sepolia</h2>
        <ConnectButton
        client={client}
        accountAbstraction={{
          chain: lineaSepolia,
          sponsorGas: true
        }}
        />
        <div className="flex flex-row">
        <NFTClaimer
          recieverAddress={account?.address}
          dropContract={lineaContract}
          tokenId={0n}
        />
        <div className="h-auto w-[1px] bg-gray-600 mx-12 mt-8"/>
        <NFTClaimer
        recieverAddress={account?.address}
        dropContract={opencampusContract}
        tokenId={0n}/>
        </div>
      </div>
    </main>
  );
}

