// src\index.ts
import express from "express";
import cors from "cors";
import trackRoute from "./routes/trackRoute";
import optimizeRoute from "./routes/optimizeRoute";



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", trackRoute);
app.use("/api", optimizeRoute);

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
