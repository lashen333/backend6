"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDevice = parseDevice;
// src\services\deviceService.ts
const ua_parser_js_1 = require("ua-parser-js");
function parseDevice(userAgent = "") {
    const parser = new ua_parser_js_1.UAParser();
    const ua = parser.setUA(userAgent).getResult();
    return {
        deviceType: ua.device.type || "desktop",
        os: ua.os.name || "",
        browser: ua.browser.name || "",
    };
}
