
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { RaffleContract } from "./raffle_contract";
import { PublicKey, Keypair, SystemProgram, LAMPORTS_PER_SOL, Transaction } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, createMint, createAccount, mintTo } from "@solana/spl-token";

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const program = anchor.workspace.RaffleContract as Program<RaffleContract>;


const createRaffle = async ({ creatorPubkey, nftMint, entryFee, maxEntries }: { creatorPubkey: PublicKey, nftMint: PublicKey, entryFee: number, maxEntries: number }) => {
    const [raffle] = PublicKey.findProgramAddressSync(
        [Buffer.from("raffle"), creatorPubkey.toBuffer()],
        program.programId
    );
    const raffleAccount = raffle;

    const transaction = await program.methods
        .initializeRaffle(nftMint, entryFee, maxEntries)
        .accountsPartial({
            raffle: raffleAccount,
            creator: creatorPubkey,
            systemProgram: SystemProgram.programId,
        })
        .transaction();

    const signature = await processTransaction(transaction);


    return {
        raffleAccount,
        signature
    }
}

const getRaffle = async ({ rafflePubkey }: { rafflePubkey: PublicKey }) => {
    const raffle = await program.account.raffle.fetch(rafflePubkey);
    return raffle;
}

const enterRaffle = async ({ raffleAccount, creatorPubkey }: { raffleAccount: PublicKey, creatorPubkey: PublicKey }) => {
    const tx = await program.methods
        .enterRaffle()
        .accountsPartial({
            raffle: raffleAccount,
            participant: Keypair.generate().publicKey,
            creator: creatorPubkey,
            systemProgram: SystemProgram.programId,
        })
        .transaction();

    const signature = await processTransaction(tx);

    return {
        signature
    }

}

const closeRaffle = async ({ raffleAccount, creatorPubkey }: { raffleAccount: PublicKey, creatorPubkey: PublicKey }) => {
    const tx = await program.methods
        .closeRaffle()
        .accountsPartial({
            raffle: raffleAccount,
            creator: creatorPubkey,
        })
        .transaction();

    const signature = await processTransaction(tx);

    return {
        signature
    }

}

const pickWinner = async ({ raffleAccount, creatorPubkey }: { raffleAccount: PublicKey, creatorPubkey: PublicKey }) => {
    const tx = await program.methods
        .pickWinner()
        .accountsPartial({
            raffle: raffleAccount,
            creator: creatorPubkey,
        })
        .transaction();

    const signature = await processTransaction(tx);

    return {
        signature
    }
}

const processTransaction = async (tx: Transaction) => {
    const blockhash = await provider.connection.getLatestBlockhash();

    tx.recentBlockhash = blockhash.blockhash;

    const signature = await provider.sendAndConfirm(tx);

    return signature;
}

export {

    createRaffle,
    getRaffle,
    enterRaffle,
    closeRaffle,
    pickWinner,

}