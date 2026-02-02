import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, isPositive, icon }) => {
  return (
    <div className="ios-glass p-6 rounded-[2rem] shadow-sm relative overflow-hidden group ios-card-hover">
      {/* Background Decor */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-current to-transparent opacity-5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 text-ios-blue dark:text-white"></div>

      <div className="flex flex-col h-full justify-between">
        <div className="flex justify-between items-start">
          <div className="p-3.5 bg-white/50 dark:bg-white/10 rounded-2xl text-ios-blue dark:text-ios-teal backdrop-blur-md shadow-sm">
            {icon}
          </div>
          {change && (
            <div className={`flex items-center text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md ${
              isPositive 
                ? 'bg-ios-green/10 text-ios-green dark:text-green-400' 
                : 'bg-ios-red/10 text-ios-red dark:text-red-400'
            }`}>
              {isPositive ? '↑' : '↓'} {change}
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <h3 className="text-4xl font-extrabold text-black dark:text-white tracking-tight mb-1">{value}</h3>
          <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;