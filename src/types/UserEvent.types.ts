// src\types\UserEvent.types.ts
export interface UserEventType{
    userId: string;
    event:"cta_click" | "stay_time" |string;
    value?: number;
    timestamp: number;
}