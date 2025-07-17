"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src\index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const trackRoute_1 = __importDefault(require("./routes/trackRoute"));
const optimizeRoute_1 = __importDefault(require("./routes/optimizeRoute"));
const heroRoute_1 = __importDefault(require("./routes/heroRoute"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const analyzeRoute_1 = __importDefault(require("./routes/analyzeRoute"));
// 🔐 Load .env variables (MONGO_URI, PORT)
dotenv.config();
// 🚀 Connect to MongoDB Atlas
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error", err));
// 📦 Create Express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// 🧠 Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// 🔁 Routes
app.use("/api", trackRoute_1.default);
app.use("/api", heroRoute_1.default);
app.use("/api", optimizeRoute_1.default);
app.use("/api", analyzeRoute_1.default);
// 🚀 Start the server
app.listen(PORT, () => {
    console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
