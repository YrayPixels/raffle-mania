'use client';

import { useEffect, useState } from 'react';
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { Sidebar } from "@/extras/components/Sidebar";
import { Header } from "@/extras/components/Header";
import { createRaffle } from "@/extras/program";
import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorProvider, getProvider, Program, setProvider } from '@coral-xyz/anchor';
import { IDL, RaffleContract } from '@/extras/program/raffle_contract';
import { DEVNET } from '@/extras/lib/constants';

export default function CreateRafflePage() {
    const [nftMint, setNftMint] = useState('');
    const [entryFee, setEntryFee] = useState('');
    const [maxEntries, setMaxEntries] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const { wallet, connected, publicKey } = useWallet();
    console.log(DEVNET);
    const connection = new Connection(DEVNET as string);

    const anchorWallet = useAnchorWallet();
    useEffect(() => {
        if (connected) {
            console.log("connected");
        }
        const anchorProvider = anchorWallet && new AnchorProvider(connection, anchorWallet, {});
        if (anchorProvider) {
            setProvider(anchorProvider);
        }
    }, [anchorWallet, connection])





    const handleCreateRaffle = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!connected || !publicKey) {
            setStatus('Please connect your wallet.');
            return;
        }

        let ancProvider = getProvider();
        const program = new Program<RaffleContract>(IDL, ancProvider);

        console.log(program);

        try {
            setLoading(true);
            setStatus('Creating raffle...');

            const result = await createRaffle({
                connection: connection,
                program: program,
                creatorPubkey: publicKey,
                nftMint: new PublicKey(nftMint),
                entryFee: parseFloat(entryFee),
                maxEntries: parseInt(maxEntries)
            });

            console.log(result);
        } catch (error) {
            console.error('Error creating raffle:', error);
            setStatus('Failed to create raffle: ' + (error instanceof Error ? error.message : error));
        } finally {
            setLoading(false);
        }
    };

    return (

        <main className="flex-1 p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Create New Raffle</h2>
            </div>
            <div className="bg-[#23263a] rounded-xl shadow-lg p-8 w-full max-w-md mx-auto">
                <form className="space-y-4" onSubmit={handleCreateRaffle}>
                    <div>
                        <label htmlFor="nftMint" className="block text-sm font-medium text-gray-300 mb-1">
                            NFT Mint Address
                        </label>
                        <input
                            id="nftMint"
                            type="text"
                            placeholder="Enter NFT mint address"
                            className="w-full px-4 py-2 rounded bg-[#202235] text-white focus:outline-none"
                            value={nftMint}
                            onChange={e => setNftMint(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="entryFee" className="block text-sm font-medium text-gray-300 mb-1">
                            Entry Fee (SOL)
                        </label>
                        <input
                            id="entryFee"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="Enter entry fee in SOL"
                            className="w-full px-4 py-2 rounded bg-[#202235] text-white focus:outline-none"
                            value={entryFee}
                            onChange={e => setEntryFee(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="maxEntries" className="block text-sm font-medium text-gray-300 mb-1">
                            Maximum Entries
                        </label>
                        <input
                            id="maxEntries"
                            type="number"
                            min="1"
                            placeholder="Enter maximum number of entries"
                            className="w-full px-4 py-2 rounded bg-[#202235] text-white focus:outline-none"
                            value={maxEntries}
                            onChange={e => setMaxEntries(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
                        disabled={loading || !connected}
                    >
                        {loading ? 'Creating...' : 'Create Raffle'}
                    </button>
                </form>
                {status && (
                    <div className="mt-4 p-4 rounded bg-[#202235] text-white text-center">
                        {status}
                    </div>
                )}
            </div>
        </main>

    );
} 