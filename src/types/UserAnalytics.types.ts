// src\types\UserAnalytics.types.ts
export interface UserAnalyticsType {
    visitorId: string;
    userId: string;
    ip: string;
    country?: string;
    city?: string;
    region?: string;
    province?: string;    
    district?: string;    
    village?: string;     
    road?: string;        
    lat?: number;         
    lon?: number;
    deviceType?: string;
    os?: string;
    browser?: string;
    utms?: Record<string, string>;
    platform?: string;
    firstSeen: number;
    lastSeen: number;
    visits: number;
    events:{
        event: string;
        value?: any;
        timestamp: number;
    }[][];
}