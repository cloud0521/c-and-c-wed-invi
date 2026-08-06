import type { Guest } from '../types/guest';

export const mockGuests: Guest[] = [
  { id: 'guest-001', fullName: 'Maria Santos', partySize: 2, invitationLabel: 'The Santos Family', rsvpStatus: 'pending' },
  { id: 'guest-002', fullName: 'John Reyes', partySize: 1, invitationLabel: 'John Reyes', rsvpStatus: 'accepted' },
  { id: 'guest-003', fullName: 'Anna Cruz', partySize: 2, invitationLabel: 'Anna Cruz and Guest', rsvpStatus: 'pending' },
];
