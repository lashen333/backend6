// src\types\UserEvent.types.ts
export interface UserEventType{
    ip: string;
    event:"cta_click" | "stay_time" |string;
    value?: number;
    timestamp?: Date;
}