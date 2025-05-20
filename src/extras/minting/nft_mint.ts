import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { generateSigner, percentAmount, createGenericFile, Umi } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters'
import base58 from "bs58";
import { DEVNET } from "@/extras/lib/constants";
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'

const uploadImage = async ({ umi, imageUrl, name }: { umi: Umi, imageUrl: string, name: string }) => {
    try {
        //1. Fetch image from URL
        const response = await fetch(imageUrl);
        const imageBuffer = await response.arrayBuffer();

        //2. Convert image to generic file
        const genericFile = createGenericFile(new Uint8Array(imageBuffer), `${name}.png`)

        //3. Upload image
        const [myUri] = await umi.uploader.upload([genericFile]);
        console.log("Your image URI: ", myUri);

        return myUri;
    }
    catch (error) {
        console.log("Oops.. Something went wrong", error);
        throw error;
    }
}

const uploadMetadata = async ({ umi, name, symbol, imageUri, description }: { umi: Umi, name: string, symbol: string, imageUri: string, description?: string }) => {
    try {
        const metadata = {
            name: name,
            symbol: symbol,
            description: description || "",
            image: imageUri,
            attributes: [
                { trait_type: 'Main Color', value: 'Green' }
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: imageUri
                    },
                ]
            },
            creators: []
        };
        const metadataUri = await umi.uploader.uploadJson(metadata)
        return metadataUri;
    }
    catch (error) {
        console.log("Oops.. Something went wrong", error);
        throw error;
    }
}

const mintNFT = async ({ wallet, name, symbol, imageUrl, description }: { wallet: any, name: string, symbol: string, imageUrl: string, description?: string }) => {
    try {
        const umi = createUmi(DEVNET);
        umi.use(walletAdapterIdentity(wallet));
        umi.use(mplTokenMetadata());

        umi.use(irysUploader());

        const mint = generateSigner(umi);

        const imageUri = await uploadImage({ umi, imageUrl, name });
        if (!imageUri) {
            throw new Error("Failed to upload image");
        }

        const metadataUri = await uploadMetadata({ umi, name, symbol, imageUri, description });
        if (!metadataUri) {
            throw new Error("Failed to upload metadata");
        }

        let tx = createNft(umi, {
            mint,
            sellerFeeBasisPoints: percentAmount(5),
            name: name,
            symbol: symbol,
            uri: metadataUri
        });

        let result = await tx.sendAndConfirm(umi);
        const signature = base58.encode(result.signature);

        console.log(`Successfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`);

        return mint.publicKey;
    } catch (error) {
        console.error("Minting failed:", error);
        throw error;
    }
}

export {
    mintNFT
};

// @metaplex-foundation / mpl - token - metadata \
// @metaplex-foundation / umi \
// @metaplex-foundation / umi - bundle - defaults \
// @metaplex-foundation / umi - uploader - nft-storage