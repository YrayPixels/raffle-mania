import { FC } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import CollectionsIcon from '@mui/icons-material/Collections';
import BarChartIcon from '@mui/icons-material/BarChart';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import LogoutIcon from '@mui/icons-material/Logout'

const navLinks = [
    { name: 'Marketplace', icon: <HomeIcon /> },
    { name: 'Domain Names', icon: <CollectionsIcon /> },
    { name: 'Virtual Worlds', icon: <CollectionsIcon /> },
    { name: 'Trading Cards', icon: <CollectionsIcon />, active: true },
    { name: 'Collectibles', icon: <CollectionsIcon /> },
    { name: 'Sports', icon: <CollectionsIcon /> },
    { name: 'Utility', icon: <CollectionsIcon /> },
    { name: 'Stats', icon: <BarChartIcon /> },
    { name: 'Resource', icon: <CollectionsIcon /> },
    { name: 'Templates', icon: <ViewModuleIcon /> },
];

export const Sidebar: FC = () => (
    <aside className="w-64 bg-[#23263a] text-white h-screen flex flex-col py-8 px-4">
        <div className="flex items-center gap-2 mb-10 px-2">
            <span className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-lg">C</span>
            <span className="text-xl font-bold">RaffleMania</span>
        </div>
        <nav className="flex-1">
            <ul className="space-y-2">
                {navLinks.map((link, idx) => (
                    <li key={link.name}>
                        <a
                            href="#"
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${link.active ? 'bg-[#2d314b] text-blue-400' : 'hover:bg-[#2d314b]'}`}
                        >
                            <span className="w-5 h-5">{link.icon}</span>
                            <span>{link.name}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d314b] mt-8">
            <span className="w-5 h-5"><LogoutIcon /></span>
            Log Out
        </button>
    </aside>
); 