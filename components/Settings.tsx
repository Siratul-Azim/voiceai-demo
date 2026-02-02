import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Key, 
  Globe, 
  Zap, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  BrainCircuit,
  Volume2
} from './Icons';

const Settings: React.FC = () => {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [useGeminiPro, setUseGeminiPro] = useState(false);

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <div 
      onClick={() => onChange(!checked)}
      className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${checked ? 'bg-ios-green' : 'bg-gray-300 dark:bg-gray-600'}`}
    >
      <div 
        className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </div>
  );

  const SettingItem = ({ 
    icon, 
    label, 
    value, 
    isToggle = false, 
    toggleValue = false, 
    onToggle,
    isDestructive = false
  }: { 
    icon: React.ReactNode; 
    label: string; 
    value?: string; 
    isToggle?: boolean; 
    toggleValue?: boolean;
    onToggle?: (v: boolean) => void;
    isDestructive?: boolean;
  }) => (
    <div className="flex items-center justify-between p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDestructive ? 'bg-ios-red/10 text-ios-red' : 'bg-ios-blue/10 text-ios-blue dark:bg-white/10 dark:text-white'}`}>
          {icon}
        </div>
        <span className={`font-medium text-[15px] ${isDestructive ? 'text-ios-red' : 'text-gray-900 dark:text-white'}`}>
          {label}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        {value && <span className="text-gray-400 text-[15px]">{value}</span>}
        {isToggle && onToggle ? (
          <Toggle checked={toggleValue} onChange={onToggle} />
        ) : (
           !isToggle && <ChevronRight size={18} className="text-gray-300 dark:text-gray-600" />
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      
      {/* Account Section */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-4 mb-3">Account</h3>
        <div className="bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5">
           <div className="p-4 flex items-center gap-4 border-b border-gray-100 dark:border-white/5 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-ios-blue to-ios-teal flex items-center justify-center text-white text-xl font-bold shadow-md">
                  JD
              </div>
              <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">John Doe</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">john.doe@voxpulse.ai</p>
              </div>
              <ChevronRight size={20} className="text-gray-300 dark:text-gray-600" />
           </div>
           <SettingItem icon={<Shield size={18} />} label="Security & Privacy" />
           <SettingItem icon={<CreditCard size={18} />} label="Billing & Subscription" value="Pro Plan" />
        </div>
      </div>

      {/* AI Configuration */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-4 mb-3">AI Configuration</h3>
        <div className="bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5">
           <SettingItem 
              icon={<BrainCircuit size={18} />} 
              label="Use Gemini 1.5 Pro" 
              isToggle={true} 
              toggleValue={useGeminiPro} 
              onToggle={setUseGeminiPro}
           />
           <SettingItem icon={<Volume2 size={18} />} label="Voice Settings" value="Rachel (Natural)" />
           <SettingItem icon={<Key size={18} />} label="API Keys" value="••••4592" />
           <SettingItem icon={<Globe size={18} />} label="Webhook Integration" value="Active" />
        </div>
        <p className="text-xs text-gray-400 ml-4 mt-2">
           Using Gemini 1.5 Pro may increase latency but provides deeper reasoning capabilities.
        </p>
      </div>

      {/* Notifications */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-4 mb-3">Notifications</h3>
        <div className="bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5">
           <SettingItem 
              icon={<Bell size={18} />} 
              label="Push Notifications" 
              isToggle={true} 
              toggleValue={pushNotifs} 
              onToggle={setPushNotifs} 
            />
           <SettingItem 
              icon={<User size={18} />} 
              label="Email Reports" 
              isToggle={true} 
              toggleValue={emailNotifs} 
              onToggle={setEmailNotifs} 
           />
        </div>
      </div>

      {/* Support & Danger Zone */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-4 mb-3">Support</h3>
        <div className="bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5">
           <SettingItem icon={<HelpCircle size={18} />} label="Help Center" />
           <SettingItem icon={<Zap size={18} />} label="Feature Request" />
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5 mt-6">
          <button className="w-full p-4 flex items-center justify-center gap-2 text-ios-red font-bold hover:bg-ios-red/5 transition-colors">
              <LogOut size={18} />
              Log Out
          </button>
      </div>

      <p className="text-center text-xs text-gray-400 mt-8 pb-4">
          VoxPulse v2.4.0 (Build 8832)
      </p>

    </div>
  );
};

export default Settings;