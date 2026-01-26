import { Router } from "express";
import { getNSDPatients } from "../services/patientService";

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

export default router;