import { Router } from "express";
import { getDiagnoses } from "../services/diagnoseService";

const router = Router();

router.get("/", (_req, res) => {
  try {
    const diagnoses = getDiagnoses();
    console.log("Fetching diagnoses...", diagnoses);
    res.send(diagnoses);
  } catch (err) {
    console.log("Error fetching diagnoses:", err);
    res.json({ error: "Error fetching diagnoses" });
  }
});

export default router;