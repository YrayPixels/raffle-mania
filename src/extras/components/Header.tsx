import { FC } from 'react';
import { WalletConnectButton } from './WalletConnectButton';
import SearchIcon from '@mui/icons-material/Search';

export const Header: FC = () => (
    <header className="flex items-center justify-between bg-[#23263a] px-8 py-4 border-b border-[#2d314b]">
        <div className="flex items-center gap-4 w-1/2">
            <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-[#2d314b] text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            {/* Add filter buttons here if needed */}
        </div>
        <div className="flex items-center gap-6">
            <WalletConnectButton />
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 flex items-center justify-center font-bold text-lg text-white">
                V
            </div>
        </div>
    </header>
); 