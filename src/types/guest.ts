export type RSVPAttendance = 'accepted' | 'declined' | 'pending';

export interface Guest {
  id: string;
  fullName: string;
  partySize: number;
  invitationLabel: string;
  rsvpStatus: RSVPAttendance;
}
