import z from "zod";
import { Weather, Visibility } from "../types";

const newEntrySchema = z.object({
  date: z.iso.date({
    error: (iss) => iss.input === undefined || !iss.input
      ? "Date is required."
      : "Invalid Date format. Need to be YYYY/MM/DD!"
  }),
  weather: z.enum(Weather, {
    error: (iss) => iss.input === undefined || !iss.input
      ? "Weather is required."
      : `Invalid Weather. Expected one of: ${Object.values(Weather).join(", ")}`
  }),
  visibility: z.enum(Visibility, {
    error: (iss) => iss.input === undefined || !iss.input
      ? "Visibility is required."
      : `Invalid Visibility. Expected one of: ${Object.values(Visibility).join(", ")}`
  }),
  comment: z.string().min(1, "Comment is required.")
});

const newEntryParser = (value: unknown) => {
  return newEntrySchema.safeParse(value);
};

export {
  newEntrySchema,
  newEntryParser
};