import React from 'react';
import { NavItem } from '../types';
import { LayoutDashboard, Phone, Users, Settings, BarChart2, BrainCircuit } from './Icons';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={22} /> },
    { id: 'calls', label: 'Calls', icon: <Phone size={22} /> },
    { id: 'agents', label: 'Agents', icon: <Users size={22} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={22} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={22} /> },
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6">
      
      {/* Brand Icon */}
      <div className="w-16 h-16 rounded-[1.2rem] bg-gradient-to-br from-ios-indigo to-ios-purple flex items-center justify-center shadow-lg shadow-ios-indigo/30 ios-card-hover cursor-pointer">
        <BrainCircuit className="text-white" size={32} strokeWidth={2.5} />
      </div>

      {/* Floating Dock */}
      <div className="ios-glass rounded-[1.5rem] p-3 flex flex-col gap-4 shadow-xl shadow-black/5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`relative group w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ease-out ${
              activeTab === item.id
                ? 'bg-ios-blue text-white shadow-lg shadow-ios-blue/30 scale-110'
                : 'text-gray-400 dark:text-gray-500 hover:bg-black/5 dark:hover:bg-white/10 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            {item.icon}
            
            {/* Tooltip */}
            <span className="absolute left-full ml-4 px-3 py-1.5 rounded-lg bg-black/80 dark:bg-white/90 text-white dark:text-black text-xs font-semibold backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none translate-x-2 group-hover:translate-x-0 transition-transform">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* User Profile */}
      <div className="w-16 h-16 ios-glass rounded-[1.2rem] flex items-center justify-center cursor-pointer ios-card-hover shadow-lg shadow-black/5 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-sm font-bold text-gray-700 dark:text-white">
          JD
        </div>
      </div>
    </div>
  );
};

export default Sidebar;