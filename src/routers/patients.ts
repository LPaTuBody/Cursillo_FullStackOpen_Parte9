import { Router, Request, Response } from "express";
import { newPatient, Patient } from "../types";
import newPatientParser from "../middleware/newPatientParserMw";
import errorMiddleware from "../middleware/errorMw";
import {
  getNSDPatients,
  addPatient,
  getOnePatient
} from "../services/patientService";

const router = Router();

router.get("/", (_req, res) => {
  try {
    const patients = getNSDPatients();
    console.log("Fetching patients...", patients);
    res.send(patients);
  } catch (err) {
    console.log("Error fetching patients:", err);
    res.status(400).send("Error fetching patients");
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (!id || typeof id !== "string") {
    res.status(400).send("Invalid ID provided");
  }

  const patient = getOnePatient(id);
  if (!patient) res.status(404).send("Patient not found");
  else {
    console.log("Fetching one patient...", patient);
    res.send(patient);
  }
});

router.post("/", newPatientParser, (
  req: Request<unknown, unknown, newPatient>,
  res: Response<Patient>
) => {
  const newPat = addPatient(req.body);
  console.log("New patient:", newPat);
  res.json(newPat);
});

router.use(errorMiddleware);

export default router;