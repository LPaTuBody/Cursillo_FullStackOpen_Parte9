import { calculateBmi } from "./calculators/bmiCalculator";
import express from "express";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (!height || !weight) res.json({
    error: "Both height and weight need to be provided"
  });
  if (isNaN(Number(height)) || isNaN(Number(weight))) res.json({
    error: "Provided values need to be numbers"
  });

  const bmi = calculateBmi(Number(height), Number(weight));
  res.json({ height, weight, bmi });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});