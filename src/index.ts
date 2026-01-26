import express from "express";
import cors from "cors";
import diagnoseRouter from "./routers/diagnoses";
import patientRouter from "./routers/patients";

const PORT = 3003;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  console.log("ping-pong, cara pálida");
  res.send("pong");
});

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});