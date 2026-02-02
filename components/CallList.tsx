import React from 'react';
import { CallLog, CallStatus } from '../types';
import { Play, MoreHorizontal, PhoneIncoming, PhoneMissed, BrainCircuit, ChevronRight } from './Icons';

interface CallListProps {
  calls: CallLog[];
  onSelectCall: (call: CallLog) => void;
}

const CallList: React.FC<CallListProps> = ({ calls, onSelectCall }) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: CallStatus) => {
    switch(status) {
      case CallStatus.COMPLETED: return 'bg-ios-green';
      case CallStatus.MISSED: return 'bg-ios-red';
      case CallStatus.ONGOING: return 'bg-ios-orange';
      default: return 'bg-gray-400';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-4">
        <h3 className="text-xl font-bold">Recent Calls</h3>
        <button className="text-ios-blue text-sm font-semibold hover:opacity-70 transition-opacity">See All</button>
      </div>
      
      <div className="ios-glass rounded-[2rem] overflow-hidden shadow-sm">
        {calls.map((call, index) => (
          <div 
            key={call.id} 
            className={`
              relative flex items-center justify-between p-5 hover:bg-white/40 dark:hover:bg-white/5 transition-colors cursor-pointer group
              ${index !== calls.length - 1 ? 'border-b border-gray-200/50 dark:border-white/5' : ''}
            `}
            onClick={() => onSelectCall(call)}
          >
             {/* Left: Avatar & Info */}
            <div className="flex items-center gap-5">
              <div className="relative">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-300">
                    {getInitials(call.customerName)}
                 </div>
                 <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-[3px] border-white dark:border-black rounded-full ${getStatusColor(call.status)}`}></div>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-[15px]">{call.customerName}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                   <span>{call.agentName}</span>
                   <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                   <span>{formatDuration(call.durationSeconds)}</span>
                </div>
              </div>
            </div>

            {/* Right: Date & Actions */}
            <div className="flex items-center gap-6">
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {new Date(call.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="text-xs text-gray-400 font-medium">
                     {new Date(call.timestamp).toLocaleDateString()}
                  </p>
               </div>
               
               <div className="flex items-center gap-3">
                  {call.analysis ? (
                      <div className="w-8 h-8 rounded-full bg-ios-purple/10 text-ios-purple flex items-center justify-center">
                          <BrainCircuit size={16} />
                      </div>
                  ) : null}
                  <ChevronRight size={20} className="text-gray-300 dark:text-gray-600 group-hover:text-gray-500 transition-colors" />
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallList;