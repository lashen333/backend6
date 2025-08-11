// src\routes\analyzeRoute.ts
import { Router } from "express";
import { getBrowserUsage } from "../controllers/browserUsageController";
import { getDeviceTypeStats } from "../controllers/deviceTypeController";
import { getEventFunnel } from "../controllers/eventFunnelController";
import { getGeoStats } from "../controllers/geoPerformanceController";
import { getUserLocations } from "../controllers/geoLocationsController";
import { getPerformanceStats } from "../controllers/performanceController";
import { getVisitsByHour } from "../controllers/visitsByHourController";
import { getVisitsOverTime } from "../controllers/visitsOverTimeController";

const router = Router();

router.get("/analyze-browser-usage", getBrowserUsage);
router.get("/analyze-device-type", getDeviceTypeStats);
router.get("/analyze-event-funnel", getEventFunnel);
router.get("/analyze-geo-performance", getGeoStats);
router.get("/user-locations", getUserLocations);
router.get("/analyze-performance", getPerformanceStats);
router.get("/analyze-visits-by-hour", getVisitsByHour);
router.get("/analyze-visits-over-time", getVisitsOverTime);

export default router;
