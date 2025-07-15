// src\types\UserEvent.types.ts
export interface UserEventType{
    userId: string;
    event:"cta_click" | "stay_time" | "utm_landing" | string;
    value?: number;
    timestamp: number;
}