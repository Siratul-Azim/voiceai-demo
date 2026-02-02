import { CallLog, CallStatus, AgentType } from './types';

export const MOCK_TRANSCRIPTS = [
  `Agent: Hello, this is VoxPulse Support. How can I help you today?
Customer: Hi, I'm having trouble logging into my dashboard. It says invalid credentials.
Agent: I can help with that. Have you tried resetting your password via the 'Forgot Password' link?
Customer: No, I haven't. Where is that located?
Agent: It's right below the login button. I can send you a direct link if you prefer.
Customer: That would be great, thanks.
Agent: Sent. Please check your email in a few moments.
Customer: Got it. Resetting now... okay, it worked! Thank you.
Agent: You're welcome! Is there anything else?
Customer: No, that's all. Bye.`,

  `Agent: Hi there! I noticed you were looking at our premium plan. Do you have any questions?
Customer: Yeah, is it really $50 a month? That seems steep.
Agent: It is $50, but it includes unlimited AI calls and advanced analytics. For your team size, it usually pays for itself in a week.
Customer: Hmm, I'm not sure. The competitor is offering something similar for $30.
Agent: I understand price is a factor. However, our latency is 50% lower, which is critical for voice. Would you like a demo?
Customer: I guess a demo wouldn't hurt.
Agent: Great! I can schedule that for tomorrow at 2 PM?
Customer: Make it 3 PM.
Agent: Done. 3 PM tomorrow.`,
  
  `Agent: Good morning, Dr. Smith's office.
Customer: Hi, I need to cancel my appointment for Tuesday.
Agent: Okay, can I get your full name?
Customer: John Doe.
Agent: I see your appointment. I've cancelled it. Would you like to reschedule?
Customer: No, not right now. I'll call back later.
Agent: Understood. Have a good day.`
];

export const INITIAL_CALLS: CallLog[] = [
  {
    id: 'call_x92k20',
    customerName: 'Alice Freeman',
    customerPhone: '+1 (555) 123-4567',
    agentName: 'Sarah (Support)',
    agentType: AgentType.SUPPORT,
    durationSeconds: 145,
    status: CallStatus.COMPLETED,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    transcript: MOCK_TRANSCRIPTS[0],
  },
  {
    id: 'call_m192j2',
    customerName: 'Marcus Chen',
    customerPhone: '+1 (555) 987-6543',
    agentName: 'Mike (Sales)',
    agentType: AgentType.SALES,
    durationSeconds: 320,
    status: CallStatus.COMPLETED,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    transcript: MOCK_TRANSCRIPTS[1],
  },
  {
    id: 'call_p0291l',
    customerName: 'John Doe',
    customerPhone: '+1 (555) 555-0199',
    agentName: 'Jessica (Booking)',
    agentType: AgentType.BOOKING,
    durationSeconds: 45,
    status: CallStatus.COMPLETED,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    transcript: MOCK_TRANSCRIPTS[2],
  },
  {
    id: 'call_f821kk',
    customerName: 'Unknown Caller',
    customerPhone: '+1 (555) 000-1111',
    agentName: 'Mike (Sales)',
    agentType: AgentType.SALES,
    durationSeconds: 0,
    status: CallStatus.MISSED,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    transcript: '',
  }
];

export const MOCK_CHART_DATA = [
  { name: 'Mon', calls: 12 },
  { name: 'Tue', calls: 19 },
  { name: 'Wed', calls: 15 },
  { name: 'Thu', calls: 25 },
  { name: 'Fri', calls: 32 },
  { name: 'Sat', calls: 10 },
  { name: 'Sun', calls: 8 },
];
