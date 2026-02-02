import React from 'react';
import { NavItem } from '../types';
import { LayoutDashboard, Phone, Users, Settings, BarChart2 } from './Icons';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Home', icon: <LayoutDashboard size={20} /> },
    { id: 'calls', label: 'Calls', icon: <Phone size={20} /> },
    { id: 'agents', label: 'Agents', icon: <Users size={20} /> },
    { id: 'analytics', label: 'Stats', icon: <BarChart2 size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="mx-4 mb-6 ios-glass rounded-[2rem] shadow-2xl shadow-black/10 border border-white/20 dark:border-white/10 p-2 flex justify-between items-center backdrop-blur-xl bg-white/80 dark:bg-black/80">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`relative flex flex-col items-center justify-center w-full py-3 rounded-[1.5rem] transition-all duration-300 ${
              activeTab === item.id
                ? 'bg-ios-blue text-white shadow-lg shadow-ios-blue/20'
                : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
            }`}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;