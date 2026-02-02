import React from 'react';

export enum CallStatus {
  COMPLETED = 'completed',
  MISSED = 'missed',
  ONGOING = 'ongoing',
  FAILED = 'failed'
}

export enum AgentType {
  SALES = 'Sales Assistant',
  SUPPORT = 'Customer Support',
  BOOKING = 'Appointment Booking'
}

export interface AnalysisResult {
  summary: string;
  sentimentScore: number; // 0-100
  sentimentLabel: 'Positive' | 'Neutral' | 'Negative';
  actionItems: string[];
  keyTopics: string[];
}

export interface CallLog {
  id: string;
  customerName: string;
  customerPhone: string;
  agentName: string;
  agentType: AgentType;
  durationSeconds: number;
  status: CallStatus;
  timestamp: string; // ISO string
  transcript: string;
  recordingUrl?: string; // Placeholder for demo
  analysis?: AnalysisResult | null;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}