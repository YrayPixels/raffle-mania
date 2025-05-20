'use client';

import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const WalletConnectButton: FC = () => {
    const { connected } = useWallet();

    return (
        <div className="flex items-center gap-4">
            <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-lg" />
            {connected && (
                <span className="text-green-500 text-sm">
                    Connected
                </span>
            )}
        </div>
    );
}; 