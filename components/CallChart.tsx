import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface DataPoint {
  name: string;
  calls: number;
}

interface CallChartProps {
  data: DataPoint[];
  isDarkMode?: boolean;
}

const CallChart: React.FC<CallChartProps> = ({ data, isDarkMode = false }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#1e293b" : "#e2e8f0"} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12 }} 
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '8px', 
              border: isDarkMode ? '1px solid #1e293b' : 'none', 
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              backgroundColor: isDarkMode ? '#0f172a' : '#fff',
              color: isDarkMode ? '#fff' : '#000'
            }}
            cursor={{ stroke: '#3b82f6', strokeWidth: 1 }}
          />
          <Area 
            type="monotone" 
            dataKey="calls" 
            stroke="#3b82f6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorCalls)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CallChart;