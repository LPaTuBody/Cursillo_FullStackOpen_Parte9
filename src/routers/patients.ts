import { Router } from "express";
import { getNSDPatients, addPatient } from "../services/patientService";

const router = Router();

router.get("/", (_req, res) => {
  try {
    const patients = getNSDPatients();
    console.log("Fetching patients...", patients);
    res.send(patients);
  } catch (err) {
    console.log("Error fetching patients:", err);
    res.json({ error: "Error fetching patients" });
  }
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPat = addPatient({ name, dateOfBirth, ssn, gender, occupation });
  console.log("New patient:", newPat);
  res.json(newPat);
});

export default router;