// src\services\visitsByHourService.ts
import { UserAnalytics } from "../models/UserAnalytics";
import moment from "moment-timezone";

export async function fetchVisitsByHour(timezone: string) {
  const visits = await UserAnalytics.find({}, { firstSeen: 1 }).lean();
  const hourCounts: { [key: number]: number } = {};

  visits.forEach((v: any) => {
    if (!v.firstSeen) return;
    const hour = moment.tz(v.firstSeen, timezone).hour();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  });

  return Array.from({ length: 24 }, (_, hour) => ({
    hour,
    visits: hourCounts[hour] || 0,
  }));
}
