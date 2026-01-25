interface Result {
  days: number,
  trainingDays: number,
  ogGoal: number,
  average: number,
  goalAchieved: boolean,
  rating: number,
  ratingDescription: string,
};

const parseArg = (args: string[]): {
  goal: number,
  dailyExHours: number[],
} => {
  if (args.length < 4) throw new Error("Incorrect amount of arguments provided.");

  const goal = Number(args[2]);
  const dailyExHours = args.filter((_a, i) => (i >= 3)).map(Number);

  if (!isNaN(goal) && dailyExHours.every(h => !isNaN(h))) {
    return { goal, dailyExHours };
  } else {
    throw new Error("All provided values need to be numbers.");
  };
};

export const calculateExercises = (
  dailyExHours: number[],
  goal: number
): Result => {
  const days = dailyExHours.length;
  const trainingDays = dailyExHours.filter(h => h !== 0).length;
  const ogGoal = goal;
  const average = dailyExHours.reduce((total, n) => total + n) / days;
  const goalAchieved = average >= goal;
  let rating = 0;
  let ratingDescription = "";

  if (average < goal) {
    rating = 1;
    ratingDescription = "need to work a little more next time";
  } else if (average === goal) {
    rating = 2;
    ratingDescription = "just the necessary to achivie your goal, not bad";
  } else {
    rating = 3;
    ratingDescription = "keep it up, you're doing a great job";
  };

  return {
    days,
    trainingDays,
    ogGoal,
    average,
    goalAchieved,
    rating,
    ratingDescription,
  };
};

try {
  const { goal, dailyExHours } = parseArg(process.argv);
  console.log(calculateExercises(dailyExHours, goal));
} catch (err) {
  let errMsg = "Something went wrong. ";
  if (err instanceof Error) {
    errMsg += err.message;
  }
  console.log(errMsg);
}