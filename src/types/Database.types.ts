// src\types\Database.types.ts

// For internal use with MongoDB UserEvent model
export interface UserEventData {
  ip: string;
  event: string;
  value?: number;
  timestamp: Date;
}
