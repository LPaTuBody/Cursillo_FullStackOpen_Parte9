import { Router } from "express";
import { getNSDPatients, addPatient } from "../services/patientService";
import { toNewPatientParser } from "../utils/toNewPatServ";

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

router.post("/", (req, res) => {
  try {
    const patientEntries = toNewPatientParser(req.body);
    const newPat = addPatient(patientEntries);
    console.log("New patient:", newPat);
    res.json(newPat);
  } catch (err: unknown) {
    let errMsg = "Something went wrong.";
    if (err instanceof Error) errMsg += " Error: " + err.message;
    res.status(400).send(errMsg);
  }
});

export default router;