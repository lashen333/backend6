// src\controllers\geoLocationsController.ts
import { Request, Response } from "express";
import { fetchUserLocations } from "../services/geoLocationsService";

export async function getUserLocations(req: Request, res: Response) {
  try {
    const locations = await fetchUserLocations();
    res.json(locations);
  } catch {
    res.status(500).json({ error: "Could not fetch user locations." });
  }
}
