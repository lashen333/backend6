// src\services\deviceService.ts
import { UAParser } from "ua-parser-js";

export function parseDevice(userAgent: string = "") {
  const parser = new UAParser();
  const ua = parser.setUA(userAgent).getResult();
  return {
    deviceType: ua.device.type || "desktop",
    os: ua.os.name || "",
    browser: ua.browser.name || "",
  };
}
