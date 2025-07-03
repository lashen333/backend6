// src\types\TrackEvent.types.ts

// POST /api/track body payload
export interface TrackEventBody {
  event: string;
  value?: number;
}
