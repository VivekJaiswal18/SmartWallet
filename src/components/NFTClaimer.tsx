import { client } from "@/app/client";
import { ThirdwebContract } from "thirdweb"
import { balanceOf, claimTo, getNFT } from "thirdweb/extensions/erc1155";
import { MediaRenderer, TransactionButton, useReadContract } from "thirdweb/react";

type NFTClaimerProps = {
    recieverAddress?: string;
    dropContract: ThirdwebContract;
    tokenId: bigint;

};

export const NFTClaimer: React.FC<NFTClaimerProps> = ({recieverAddress, dropContract, tokenId}) =>{

    const {data: nft, isLoading: isNFTLoading } = useReadContract(getNFT,
        {contract: dropContract,
            tokenId: tokenId
        }
    );

    const {data: ownedNFTs} = useReadContract(
        balanceOf,
        {
            contract: dropContract,
            owner: recieverAddress, 
            tokenId: tokenId,
            queryOptions: {enabled: !!recieverAddress}
        }
    );

    return(
        <div className="flex flex-col my-8 items-center justify-center ">
            {isNFTLoading ? (
                <div className="w-full mt-24">Loading...</div>
            ): (
                <>
                <div >
                {nft &&(

                    <MediaRenderer 
                    client={client}
                    src={nft?.metadata?.image}
                    />
                )}
                </div>
                {recieverAddress ? (
                    <div className="flex flex-col">
                    <p className="text-center mt-8">
                        You own {ownedNFTs?.toString() || "0"} NFTs on {dropContract.chain.name}
                        <div className="flex items-baseline justify-center mt-8">
                     <TransactionButton
                     transaction={()=>claimTo({
                         contract: dropContract,
                         tokenId: tokenId,
                         to: recieverAddress,
                         quantity: 1n
                     })}
                        onTransactionConfirmed={async ()=>{
                            alert("NFT Claimed");
                        }}
                     >
                         Claim
                     </TransactionButton>
                     </div>
                   </p>
                   </div>
                ):(
                    <p className="text-center mt-8">
                        Login to Claim this NFT
                    </p>
                )
            }
                </>

            )}
        </div>
    )
};