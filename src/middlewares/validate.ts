// src\middlewares\validate.ts
import { AnyZodObject } from "zod";
import { RequestHandler } from "express";
export const validate =
  (schema: AnyZodObject): RequestHandler =>
  (req, _res, next) => {
    const data = { body: req.body, query: req.query, params: req.params };
    schema.parse(data);
    next();
  };
