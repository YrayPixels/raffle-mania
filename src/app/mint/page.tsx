'use client';
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletConnectButton } from '@/extras/components/WalletConnectButton';
import { Sidebar } from "@/extras/components/Sidebar";
import { Header } from "@/extras/components/Header";
import { mintNFT } from "@/extras/minting/nft_mint";

export default function MintPage() {
    const wallet = useWallet();
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [image, setImage] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleMint = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!wallet.connected) {
            setStatus('Please connect your wallet.');
            return;
        }
        setLoading(true);
        setStatus('Minting NFT...');
        try {
            const mint = await mintNFT({
                wallet: wallet,
                name: name,
                symbol: symbol,
                imageUrl: image,
                description: "A randomly minted NFT",
            });
            setStatus(`Successfully minted NFT! Mint address: ${mint}`);
        } catch (e) {
            setStatus('Mint failed: ' + (e instanceof Error ? e.message : e));
        }
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen bg-[#202235]">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">Mint NFT</h2>
                    </div>
                    <div className="bg-[#23263a] rounded-xl shadow-lg p-8 w-full max-w-md mx-auto">
                        {!wallet.connected && (
                            <div className="mb-4"><WalletConnectButton /></div>
                        )}
                        <form className="space-y-4" onSubmit={handleMint}>
                            <input
                                type="text"
                                placeholder="NFT Name"
                                className="w-full px-4 py-2 rounded bg-[#202235] text-white focus:outline-none"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Symbol"
                                className="w-full px-4 py-2 rounded bg-[#202235] text-white focus:outline-none"
                                value={symbol}
                                onChange={e => setSymbol(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                className="w-full px-4 py-2 rounded bg-[#202235] text-white focus:outline-none"
                                value={image}
                                onChange={e => setImage(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
                                disabled={loading || !wallet.connected}
                            >
                                {loading ? 'Minting...' : 'Mint NFT'}
                            </button>
                        </form>
                        {status && <div className="mt-4 text-white text-center">{status}</div>}
                    </div>
                </main>
            </div>
        </div>
    );
} 