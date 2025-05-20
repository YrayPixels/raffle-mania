import { BN, Program } from "@coral-xyz/anchor";
import { IDL, RaffleContract } from "./raffle_contract";
import { PublicKey, Keypair, SystemProgram, LAMPORTS_PER_SOL, Transaction, Connection } from "@solana/web3.js";

const createRaffle = async ({ program, creatorPubkey, nftMint, entryFee, maxEntries, connection }: { program: Program<RaffleContract>, creatorPubkey: PublicKey, nftMint: PublicKey, entryFee: number, maxEntries: number, connection: Connection }) => {

    const [raffle] = PublicKey.findProgramAddressSync(
        [Buffer.from("raffle"), creatorPubkey.toBuffer()],
        program.programId
    );
    const raffleAccount = raffle;

    const transaction = await program.methods
        .initializeRaffle(nftMint, new BN(entryFee), new BN(maxEntries))
        .accountsPartial({
            raffle: raffleAccount,
            creator: creatorPubkey,
            systemProgram: SystemProgram.programId,
        })
        .signers([]).rpc();

    return {
        transaction
    }

    // transaction.feePayer = creatorPubkey;


    // const signature = await processTransaction(transaction, connection);


    // return {
    //     raffleAccount,
    //     signature
    // }
}

const getRaffle = async ({ program, rafflePubkey }: { program: Program<RaffleContract>, rafflePubkey: PublicKey }) => {

    const raffle = await program.account.raffle.fetch(rafflePubkey);
    return raffle;
}

const enterRaffle = async ({ raffleAccount, creatorPubkey, program, connection }: { raffleAccount: PublicKey, creatorPubkey: PublicKey, program: Program<RaffleContract>, connection: Connection }) => {

    const tx = await program.methods
        .enterRaffle()
        .accountsPartial({
            raffle: raffleAccount,
            participant: Keypair.generate().publicKey,
            creator: creatorPubkey,
            systemProgram: SystemProgram.programId,
        })
        .transaction();

    tx.feePayer = creatorPubkey;



    const signature = await processTransaction(tx, connection);

    return {
        signature
    }

}

const closeRaffle = async ({ raffleAccount, creatorPubkey, program, connection }: { raffleAccount: PublicKey, creatorPubkey: PublicKey, program: Program<RaffleContract>, connection: Connection }) => {
    const tx = await program.methods
        .closeRaffle()
        .accountsPartial({
            raffle: raffleAccount,
            creator: creatorPubkey,
        })
        .transaction();

    tx.feePayer = creatorPubkey;

    const signature = await processTransaction(tx, connection);

    return {
        signature
    }

}

const pickWinner = async ({ raffleAccount, creatorPubkey, program, connection }: { raffleAccount: PublicKey, creatorPubkey: PublicKey, program: Program<RaffleContract>, connection: Connection }) => {
    const tx = await program.methods
        .pickWinner()
        .accountsPartial({
            raffle: raffleAccount,
            creator: creatorPubkey,
        })
        .transaction();

    tx.feePayer = creatorPubkey;

    const signature = await processTransaction(tx, connection);

    return {
        signature
    }
}

const processTransaction = async (tx: Transaction, connection: Connection) => {

    const blockhash = await connection.getLatestBlockhash();

    tx.recentBlockhash = blockhash.blockhash;


    const signature = await connection.sendRawTransaction(tx.serialize());

    return signature;
}

export {

    createRaffle,
    getRaffle,
    enterRaffle,
    closeRaffle,
    pickWinner,

}