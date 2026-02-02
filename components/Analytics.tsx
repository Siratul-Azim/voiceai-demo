import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area
} from 'recharts';
import StatsCard from './StatsCard';
import { Activity, TrendingUp, Award, Clock, Users, BrainCircuit } from './Icons';

const AGENT_DATA = [
  { name: 'Sarah', calls: 145, rating: 4.8, sentiment: 85 },
  { name: 'Mike', calls: 132, rating: 4.5, sentiment: 78 },
  { name: 'Jessica', calls: 98, rating: 4.9, sentiment: 92 },
  { name: 'David', calls: 115, rating: 4.2, sentiment: 70 },
];

const SENTIMENT_DATA = [
  { name: 'Positive', value: 65, color: '#34C759' },
  { name: 'Neutral', value: 25, color: '#FF9500' },
  { name: 'Negative', value: 10, color: '#FF3B30' },
];

const VOLUME_DATA = [
  { time: '09:00', calls: 12 },
  { time: '10:00', calls: 25 },
  { time: '11:00', calls: 32 },
  { time: '12:00', calls: 18 },
  { time: '13:00', calls: 22 },
  { time: '14:00', calls: 45 },
  { time: '15:00', calls: 30 },
  { time: '16:00', calls: 28 },
];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Top Level Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard 
          title="Avg Sentiment" 
          value="82/100" 
          change="4%" 
          isPositive={true} 
          icon={<BrainCircuit size={24} />} 
        />
        <StatsCard 
          title="Resolution Rate" 
          value="94.5%" 
          change="1.2%" 
          isPositive={true} 
          icon={<TrendingUp size={24} />} 
        />
        <StatsCard 
          title="Avg Handle Time" 
          value="4m 12s" 
          change="12s" 
          isPositive={false} 
          icon={<Clock size={24} />} 
        />
        <StatsCard 
          title="Top Agent" 
          value="Jessica" 
          icon={<Award size={24} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart: Agent Performance */}
        <div className="lg:col-span-2 ios-glass p-6 md:p-8 rounded-[2.5rem] shadow-sm">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Agent Performance</h3>
            <p className="text-sm text-gray-500 font-medium">Calls handled vs Customer Satisfaction</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={AGENT_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="calls" name="Calls Handled" fill="#007AFF" radius={[6, 6, 6, 6]} barSize={40} />
                <Bar dataKey="sentiment" name="Avg Sentiment" fill="#5856D6" radius={[6, 6, 6, 6]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Distribution */}
        <div className="ios-glass p-6 md:p-8 rounded-[2.5rem] shadow-sm flex flex-col">
          <div className="mb-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Sentiment Breakdown</h3>
            <p className="text-sm text-gray-500 font-medium">Distribution of call analysis</p>
          </div>
          <div className="flex-1 flex items-center justify-center relative">
            <div className="h-[250px] w-full relative z-10">
               <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SENTIMENT_DATA}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {SENTIMENT_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">82%</span>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Positive</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {SENTIMENT_DATA.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{item.name}</span>
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hourly Trend */}
      <div className="ios-glass p-6 md:p-8 rounded-[2.5rem] shadow-sm">
         <div className="mb-6 flex justify-between items-center">
            <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Hourly Call Volume</h3>
                <p className="text-sm text-gray-500 font-medium">Today's traffic pattern</p>
            </div>
         </div>
         <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={VOLUME_DATA}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34C759" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#34C759" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '12px' }} />
                <Area type="monotone" dataKey="calls" stroke="#34C759" strokeWidth={3} fillOpacity={1} fill="url(#colorTraffic)" />
              </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>
    </div>
  );
};

export default Analytics;