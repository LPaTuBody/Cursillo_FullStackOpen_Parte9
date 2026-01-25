import { calculateBmi } from "./src/bmiCalculator";
import { calculateExercises } from "./src/exerciseCalculator";
import express from "express";

const app = express();
app.use(express.json());

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

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) res.json({ error: "parameters missing" });

  /* eslint-disable-next-line
  @typescript-eslint/no-unsafe-assignment,
  @typescript-eslint/no-unsafe-call,
  @typescript-eslint/no-unsafe-member-access
  */
  const dailyExHours = daily_exercises.map(Number);
  const goal = Number(target);

  /* eslint-disable-next-line
  @typescript-eslint/no-unsafe-member-access,
  @typescript-eslint/no-unsafe-call
  */
  if (isNaN(goal) || dailyExHours.some((h: number) => isNaN(h)))
    res.json({ error: "malformatted parameters" });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(dailyExHours, goal);
  res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});