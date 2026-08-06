import type { RSVPAttendance } from './guest';

export interface RSVPQuestion {
  id: string;
  label: string;
  type: 'text' | 'select' | 'textarea';
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
}

export interface RSVPConfig {
  deadline: string;
  allowGuestMessage: boolean;
  questions: RSVPQuestion[];
  confirmation: {
    accepted: string;
    declined: string;
  };
}

export interface RSVPResponse {
  guestId?: string;
  guestName: string;
  attendance: RSVPAttendance;
  guestCount: number;
  message?: string;
}
