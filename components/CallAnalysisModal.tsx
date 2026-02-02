import React, { useState, useEffect } from 'react';
import { CallLog, AnalysisResult } from '../types';
import { XCircle, BrainCircuit, Loader2, CheckCircle2, Download, MessageSquare, Activity, ListTodo, X } from './Icons';
import { analyzeTranscript } from '../services/geminiService';

interface CallAnalysisModalProps {
  call: CallLog | null;
  onClose: () => void;
  onUpdateCall: (updatedCall: CallLog) => void;
}

const CallAnalysisModal: React.FC<CallAnalysisModalProps> = ({ call, onClose, onUpdateCall }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Reset state when call changes
    setIsAnalyzing(false);
  }, [call]);

  if (!call) return null;

  const handleAnalyze = async () => {
    if (!call.transcript) return;
    setIsAnalyzing(true);
    const result = await analyzeTranscript(call.transcript);
    
    const updatedCall: CallLog = {
      ...call,
      analysis: result
    };
    
    onUpdateCall(updatedCall);
    setIsAnalyzing(false);
  };

  const getSentimentColor = (score: number) => {
    if (score >= 75) return 'bg-ios-green';
    if (score >= 40) return 'bg-ios-orange';
    return 'bg-ios-red';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/20 dark:bg-black/60 backdrop-blur-sm transition-all">
      <div className="bg-white/80 dark:bg-black/80 backdrop-blur-2xl rounded-[3rem] shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-500 border border-white/40 dark:border-white/10 ring-1 ring-black/5">
        
        {/* Header */}
        <div className="px-10 py-6 border-b border-gray-200/50 dark:border-white/10 flex justify-between items-center sticky top-0 z-10 bg-white/50 dark:bg-black/50 backdrop-blur-xl">
          <div className="flex items-center gap-6">
             <div className="w-14 h-14 bg-gradient-to-br from-ios-blue to-ios-teal rounded-2xl flex items-center justify-center shadow-lg shadow-ios-blue/20">
                <BrainCircuit size={28} className="text-white" />
             </div>
             <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Call Intelligence</h2>
                <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-xs font-mono text-gray-500">{call.id}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">{new Date(call.timestamp).toLocaleString()}</span>
                </div>
             </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Column: Transcript */}
          <div className="w-full md:w-5/12 border-r border-gray-200/50 dark:border-white/10 flex flex-col h-full bg-gray-50/50 dark:bg-white/5">
            <div className="p-6 px-10 border-b border-gray-200/50 dark:border-white/10 flex justify-between items-center">
              <h3 className="font-bold text-gray-700 dark:text-white flex items-center gap-2">
                <MessageSquare size={18} className="text-gray-400" />
                Transcript
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8">
              {call.transcript ? (
                <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-gray-600 dark:text-gray-300 bg-white dark:bg-black/20 p-8 rounded-[2rem] shadow-sm border border-white/50 dark:border-white/5">
                  {call.transcript}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <p className="italic">No transcript available.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: AI Insights */}
          <div className="w-full md:w-7/12 overflow-y-auto p-10 bg-white/30 dark:bg-black/20">
            <div className="flex items-center justify-between mb-8">
               <h3 className="font-bold text-gray-900 dark:text-white text-xl">
                AI Analysis
              </h3>
              {!call.analysis && (
                <button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !call.transcript}
                  className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 disabled:opacity-50 transition-all hover:scale-105 active:scale-95 shadow-xl"
                >
                  {isAnalyzing ? <Loader2 className="animate-spin" size={18} /> : <BrainCircuit size={18} />}
                  {isAnalyzing ? 'Thinking...' : 'Analyze'}
                </button>
              )}
            </div>

            {call.analysis ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                
                {/* Summary Hero */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-white/10 dark:to-white/5 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                   <div className="relative z-10">
                        <h4 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">Executive Summary</h4>
                        <p className="text-gray-100 dark:text-gray-200 leading-relaxed font-medium text-lg">
                            {call.analysis.summary}
                        </p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Sentiment Widget */}
                    <div className="bg-white dark:bg-white/5 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-white/5">
                        <div className="flex justify-between items-start mb-6">
                             <div className="w-10 h-10 rounded-full bg-ios-pink/10 flex items-center justify-center text-ios-pink">
                                <Activity size={20} />
                             </div>
                             <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getSentimentColor(call.analysis.sentimentScore)}`}>
                                {call.analysis.sentimentLabel}
                             </span>
                        </div>
                        
                        <div className="text-5xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter">
                            {call.analysis.sentimentScore}
                        </div>
                        <p className="text-sm font-semibold text-gray-400">Sentiment Score</p>
                        
                        <div className="w-full bg-gray-100 dark:bg-white/10 rounded-full h-2 mt-4 overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${getSentimentColor(call.analysis.sentimentScore)}`} 
                                style={{ width: `${call.analysis.sentimentScore}%` }}
                            ></div>
                        </div>
                    </div>

                     {/* Topics Widget */}
                    <div className="bg-white dark:bg-white/5 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-white/5">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-6">Key Topics</h4>
                        <div className="flex flex-wrap gap-2">
                            {call.analysis.keyTopics.map((topic, idx) => (
                            <span key={idx} className="text-xs font-bold bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-xl">
                                #{topic}
                            </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Items */}
                <div className="bg-white dark:bg-white/5 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-white/5">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <ListTodo className="text-ios-blue" size={20} />
                        Next Steps
                    </h4>
                    <div className="space-y-4">
                        {call.analysis.actionItems.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-4 group">
                            <div className="mt-0.5 w-5 h-5 rounded-full border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center group-hover:border-ios-green group-hover:bg-ios-green/10 transition-colors">
                                <div className="w-2.5 h-2.5 rounded-full bg-ios-green opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{item}</span>
                        </div>
                        ))}
                    </div>
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <BrainCircuit size={64} className="mb-6 opacity-20" />
                <p className="text-lg font-medium text-gray-500">Ready for Intelligence</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallAnalysisModal;