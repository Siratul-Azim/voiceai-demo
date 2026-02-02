import React, { useState } from 'react';
import { BrainCircuit, Loader2, ChevronRight } from './Icons';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('demo@voxpulse.ai');
  const [password, setPassword] = useState('password');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay for realism
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] w-full p-6">
      <div className="w-full max-w-[400px]">
        
        <div className="flex flex-col items-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
             <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-ios-indigo to-ios-purple flex items-center justify-center shadow-2xl shadow-ios-indigo/30 mb-6 ios-card-hover">
                <BrainCircuit className="text-white" size={48} strokeWidth={2.5} />
             </div>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Welcome Back</h1>
             <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Sign in to VoxPulse Intelligence</p>
        </div>

        <div className="ios-glass p-8 rounded-[2.5rem] shadow-xl animate-in fade-in zoom-in-95 duration-1000 delay-150 border border-white/40 dark:border-white/10 backdrop-blur-3xl">
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-ios-blue focus:ring-4 focus:ring-ios-blue/10 transition-all font-medium text-gray-900 dark:text-white placeholder-gray-400"
                        placeholder="name@company.com"
                    />
                </div>
                
                <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-ios-blue focus:ring-4 focus:ring-ios-blue/10 transition-all font-medium text-gray-900 dark:text-white placeholder-gray-400"
                        placeholder="••••••••"
                    />
                </div>

                <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-lg py-4 rounded-2xl mt-2 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 shadow-lg shadow-black/10 dark:shadow-white/10"
                >
                    {isLoading ? (
                        <Loader2 className="animate-spin" size={24} />
                    ) : (
                        <>
                            Sign In <ChevronRight size={20} strokeWidth={3} />
                        </>
                    )}
                </button>
            </form>
        </div>
        
        <div className="mt-8 text-center animate-in fade-in duration-1000 delay-300">
            <p className="text-sm text-gray-400 font-medium cursor-pointer hover:text-ios-blue transition-colors">
                Forgot Password?
            </p>
        </div>

      </div>
    </div>
  );
};

export default Login;