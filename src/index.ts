import express from "express";
import cors from "cors";
import diagnoseRouter from "./routers/diagnoses";

const PORT = 3003;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  console.log("ping-pong, cara pálida");
  res.send("pong");
});

app.use("/api/diagnoses", diagnoseRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});