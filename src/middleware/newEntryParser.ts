import { NextFunction, Request, Response } from "express";
import newEntrySchema from "../utils/newEntrySchema";
import patiData from "../data/patients";

const newEntryParser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patient = patiData.find(p => p.id === req.params.id);
    if (!patient) res.status(404).json({ error: "Patient not found" });

    const result = newEntrySchema.safeParse(req.body);
    if (!result.success) res.status(400).json(result.error.issues);

    req.body = result.data;
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default newEntryParser;