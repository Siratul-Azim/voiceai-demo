import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import StatsCard from './components/StatsCard';
import CallList from './components/CallList';
import CallChart from './components/CallChart';
import CallAnalysisModal from './components/CallAnalysisModal';
import Login from './components/Login';
import MobileNav from './components/MobileNav';
import Analytics from './components/Analytics';
import SettingsView from './components/Settings';
import { Phone, Users, BarChart2, Bell, Search, ChevronDown, PhoneIncoming, PhoneMissed, Loader2, BrainCircuit, Sun, Moon, Activity, LogOut, User, CheckCircle2, Settings } from './components/Icons';
import { CallLog, CallStatus, AgentType } from './types';
import { INITIAL_CALLS, MOCK_CHART_DATA, MOCK_TRANSCRIPTS } from './constants';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [calls, setCalls] = useState<CallLog[]>(INITIAL_CALLS);
  const [selectedCall, setSelectedCall] = useState<CallLog | null>(null);
  const [isSimulatingCall, setIsSimulatingCall] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Dropdown States
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Stats derivation
  const totalCalls = calls.length;
  const totalMinutes = Math.floor(calls.reduce((acc, curr) => acc + curr.durationSeconds, 0) / 60);
  const avgDuration = totalCalls ? Math.floor(totalMinutes / totalCalls) : 0;

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleUpdateCall = (updatedCall: CallLog) => {
    setCalls(prev => prev.map(c => c.id === updatedCall.id ? updatedCall : c));
    setSelectedCall(updatedCall);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowProfileMenu(false);
  };

  const simulateNewCall = () => {
    setIsSimulatingCall(true);
    
    // Simulate latency
    setTimeout(() => {
      const newCall: CallLog = {
        id: `call_${Math.random().toString(36).substr(2, 6)}`,
        customerName: 'New Lead',
        customerPhone: '+1 (555) 349-2201',
        agentName: 'Mike (Sales)',
        agentType: AgentType.SALES,
        durationSeconds: Math.floor(Math.random() * 300) + 30, // Random duration
        status: CallStatus.COMPLETED,
        timestamp: new Date().toISOString(),
        transcript: MOCK_TRANSCRIPTS[Math.floor(Math.random() * MOCK_TRANSCRIPTS.length)],
      };

      setCalls(prev => [newCall, ...prev]);
      setIsSimulatingCall(false);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen text-gray-900 dark:text-white transition-colors duration-500">
      {/* Mesh Background */}
      <div className="mesh-bg"></div>

      {!isAuthenticated ? (
        <Login onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <>
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {/* Main Content */}
          <main className="relative z-10 pl-0 md:pl-32 pr-4 md:pr-6 py-6 pb-32 md:pb-6 max-w-[1600px] mx-auto transition-all duration-500">
            
            {/* iOS-style Floating Header */}
            <header className="sticky top-4 md:top-6 z-40 mb-8 md:mb-10">
                <div className="ios-glass rounded-[2rem] px-4 md:px-6 py-3 md:py-4 flex justify-between items-center shadow-lg shadow-black/5 mx-2 md:mx-0">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 capitalize">
                        {activeTab === 'dashboard' ? 'Overview' : activeTab === 'analytics' ? 'Analytics' : activeTab === 'settings' ? 'Settings' : activeTab}
                        </h1>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4 relative">
                        {/* Search Pill */}
                        <div className="hidden lg:flex items-center bg-gray-100/50 dark:bg-white/10 rounded-full px-4 py-2.5 w-64 border border-transparent focus-within:border-ios-blue/50 focus-within:bg-white/80 dark:focus-within:bg-black/40 transition-all">
                            <Search className="text-gray-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="bg-transparent border-none outline-none ml-2 w-full text-sm font-medium placeholder-gray-400"
                            />
                        </div>

                        <button 
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-yellow-400 hover:scale-110 transition-transform"
                        >
                            {isDarkMode ? <Sun size={20} fill="currentColor" /> : <Moon size={20} fill="currentColor" />}
                        </button>

                        {/* Notifications */}
                        <div className="relative">
                          <button 
                            onClick={() => {
                              setShowNotifications(!showNotifications);
                              setShowProfileMenu(false);
                            }}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                              showNotifications 
                                ? 'bg-ios-blue text-white shadow-lg shadow-ios-blue/30' 
                                : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white hover:scale-110'
                            }`}
                          >
                              <Bell size={20} />
                              <span className="absolute top-2.5 right-3 w-2 h-2 bg-ios-red rounded-full ring-2 ring-white dark:ring-black"></span>
                          </button>

                          {/* Notification Dropdown */}
                          {showNotifications && (
                            <div className="absolute right-0 top-14 w-80 md:w-96 ios-glass rounded-[2rem] shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden border border-white/40 dark:border-white/10 z-50">
                              <div className="p-4 border-b border-gray-100 dark:border-white/10 flex justify-between items-center bg-white/50 dark:bg-black/50">
                                <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
                                <span className="text-xs font-bold bg-ios-blue text-white px-2 py-0.5 rounded-full">3 New</span>
                              </div>
                              <div className="max-h-[300px] overflow-y-auto p-2">
                                <div className="p-3 hover:bg-white/40 dark:hover:bg-white/10 rounded-2xl transition-colors cursor-pointer group">
                                   <div className="flex gap-3">
                                      <div className="w-10 h-10 rounded-full bg-ios-red/10 text-ios-red flex items-center justify-center shrink-0">
                                        <PhoneMissed size={18} />
                                      </div>
                                      <div>
                                        <p className="text-sm font-bold text-gray-800 dark:text-white">Missed Call: High Priority</p>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">VIP client from +1 (555) 000-1111 tried to reach Sales.</p>
                                        <p className="text-[10px] text-gray-400 mt-2 font-medium">2 min ago</p>
                                      </div>
                                   </div>
                                </div>
                                <div className="p-3 hover:bg-white/40 dark:hover:bg-white/10 rounded-2xl transition-colors cursor-pointer group">
                                   <div className="flex gap-3">
                                      <div className="w-10 h-10 rounded-full bg-ios-green/10 text-ios-green flex items-center justify-center shrink-0">
                                        <CheckCircle2 size={18} />
                                      </div>
                                      <div>
                                        <p className="text-sm font-bold text-gray-800 dark:text-white">System Update Complete</p>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">New Gemini 2.0 Flash model is now active for all agents.</p>
                                        <p className="text-[10px] text-gray-400 mt-2 font-medium">1 hr ago</p>
                                      </div>
                                   </div>
                                </div>
                                <div className="p-3 hover:bg-white/40 dark:hover:bg-white/10 rounded-2xl transition-colors cursor-pointer group">
                                   <div className="flex gap-3">
                                      <div className="w-10 h-10 rounded-full bg-ios-indigo/10 text-ios-indigo flex items-center justify-center shrink-0">
                                        <Activity size={18} />
                                      </div>
                                      <div>
                                        <p className="text-sm font-bold text-gray-800 dark:text-white">Daily Report Ready</p>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">Your analytics summary for yesterday is available.</p>
                                        <p className="text-[10px] text-gray-400 mt-2 font-medium">5 hrs ago</p>
                                      </div>
                                   </div>
                                </div>
                              </div>
                              <div className="p-3 border-t border-gray-100 dark:border-white/10 text-center bg-white/30 dark:bg-white/5">
                                <button className="text-xs font-bold text-ios-blue hover:underline">Mark all as read</button>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Profile Menu */}
                        <div className="relative">
                          <button 
                            onClick={() => {
                              setShowProfileMenu(!showProfileMenu);
                              setShowNotifications(false);
                            }}
                            className={`w-10 h-10 rounded-full bg-gradient-to-tr from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-sm font-bold text-gray-700 dark:text-white hover:scale-110 transition-transform shadow-sm ring-2 ${showProfileMenu ? 'ring-ios-blue' : 'ring-transparent'}`}
                          >
                            JD
                          </button>

                          {/* Profile Dropdown */}
                          {showProfileMenu && (
                            <div className="absolute right-0 top-14 w-64 ios-glass rounded-[2rem] shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden border border-white/40 dark:border-white/10 z-50 p-2">
                               <div className="p-4 flex items-center gap-3 border-b border-gray-200/50 dark:border-white/10 pb-4 mb-2">
                                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-ios-blue to-ios-teal flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    JD
                                  </div>
                                  <div>
                                    <p className="font-bold text-gray-900 dark:text-white">John Doe</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Admin Account</p>
                                  </div>
                               </div>

                               <div className="space-y-1">
                                  <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/50 dark:hover:bg-white/10 flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors">
                                    <User size={18} className="text-gray-400" />
                                    My Profile
                                  </button>
                                  <button 
                                    onClick={() => { setActiveTab('settings'); setShowProfileMenu(false); }}
                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/50 dark:hover:bg-white/10 flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
                                  >
                                    <Settings size={18} className="text-gray-400" />
                                    Account Settings
                                  </button>
                                  <div className="h-px bg-gray-200/50 dark:bg-white/10 my-2"></div>
                                  <button 
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-ios-red/10 flex items-center gap-3 text-sm font-bold text-ios-red transition-colors"
                                  >
                                    <LogOut size={18} />
                                    Log Out
                                  </button>
                               </div>
                            </div>
                          )}
                        </div>

                    </div>
                </div>
            </header>

            {/* Content Area */}
            <div className="px-2 md:px-0">
              
              {activeTab === 'dashboard' && (
                <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <StatsCard 
                      title="Calls Today" 
                      value={totalCalls} 
                      change="12%" 
                      isPositive={true}
                      icon={<Phone size={24} />} 
                    />
                    <StatsCard 
                      title="Total Minutes" 
                      value={totalMinutes} 
                      change="8%" 
                      isPositive={true}
                      icon={<Activity size={24} />} 
                    />
                    <StatsCard 
                      title="Avg Duration" 
                      value={`${avgDuration}m`} 
                      change="2%" 
                      isPositive={false}
                      icon={<Loader2 size={24} />} 
                    />
                    <StatsCard 
                      title="Active Agents" 
                      value="3" 
                      icon={<Users size={24} />} 
                    />
                  </div>

                  {/* Bento Grid Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Chart Widget */}
                    <div className="lg:col-span-2 ios-glass p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm">
                      <div className="flex justify-between items-center mb-6 md:mb-8">
                        <div>
                            <h3 className="text-lg md:text-xl font-bold">Call Volume</h3>
                            <p className="text-xs md:text-sm text-gray-400 font-medium">Weekly performance</p>
                        </div>
                        <div className="bg-gray-100/80 dark:bg-white/10 p-1 rounded-xl flex text-xs font-semibold">
                            <button className="px-3 md:px-4 py-1.5 bg-white dark:bg-gray-700 rounded-lg shadow-sm text-black dark:text-white">Week</button>
                            <button className="px-3 md:px-4 py-1.5 text-gray-500 dark:text-gray-400">Month</button>
                        </div>
                      </div>
                      <CallChart data={MOCK_CHART_DATA} isDarkMode={isDarkMode} />
                    </div>

                    {/* Simulator Widget */}
                    <div className="ios-glass p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm flex flex-col justify-between relative overflow-hidden group min-h-[300px]">
                      <div className="absolute inset-0 bg-gradient-to-br from-ios-indigo/10 to-ios-purple/10 dark:from-ios-indigo/20 dark:to-ios-purple/20"></div>
                      
                      <div className="relative z-10">
                        <div className="w-14 h-14 bg-white dark:bg-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                            <BrainCircuit size={28} className="text-ios-indigo dark:text-ios-teal" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Test Agent</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">
                            Generate a synthetic call to validate your AI configuration.
                        </p>
                      </div>
                      
                      <button 
                        onClick={simulateNewCall}
                        disabled={isSimulatingCall}
                        className="relative z-10 w-full mt-8 bg-black dark:bg-white text-white dark:text-black font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-transform active:scale-95 disabled:opacity-70 shadow-xl"
                      >
                        {isSimulatingCall ? (
                          <Loader2 className="animate-spin" size={20} />
                        ) : (
                          <PhoneIncoming size={20} />
                        )}
                        {isSimulatingCall ? 'Connecting...' : 'Start Simulation'}
                      </button>
                    </div>
                  </div>

                  {/* Calls List */}
                  <div className="pt-4">
                    <CallList calls={calls} onSelectCall={setSelectedCall} />
                  </div>
                </div>
              )}

              {activeTab === 'calls' && (
                <div className="pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <CallList calls={calls} onSelectCall={setSelectedCall} />
                </div>
              )}

              {activeTab === 'analytics' && <Analytics />}
              
              {activeTab === 'settings' && <SettingsView />}
              
              {(activeTab !== 'dashboard' && activeTab !== 'calls' && activeTab !== 'analytics' && activeTab !== 'settings') && (
                <div className="h-[50vh] md:h-[60vh] ios-glass rounded-[2.5rem] md:rounded-[3rem] flex flex-col items-center justify-center text-center p-10">
                   <div className="w-24 h-24 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-300 dark:text-gray-600">
                     <Users size={48} />
                   </div>
                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Coming Soon</h3>
                   <p className="text-gray-500 max-w-md">We are currently building the <span className="text-ios-blue font-semibold">{activeTab}</span> experience.</p>
                </div>
              )}

            </div>
          </main>
        </>
      )}

      {/* Modal */}
      {selectedCall && (
        <CallAnalysisModal 
          call={selectedCall} 
          onClose={() => setSelectedCall(null)} 
          onUpdateCall={handleUpdateCall}
        />
      )}
    </div>
  );
}

export default App;