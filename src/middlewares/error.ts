// src\middlewares\error.ts
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
  if (err instanceof ZodError) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "ValidationError", details: err.flatten() });
  }
  const payload = { error: err.name ?? "Error", message: err.message ?? "Unknown error" };
  res.status(status).json(payload);
}
