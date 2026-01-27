import { NextFunction, Request, Response } from "express";
import newPatientSchema from "../utils/newPatientSchema";

const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default newPatientParser;