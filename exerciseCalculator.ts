interface Result {
  days: number,
  trainingDays: number,
  ogGoal: number,
  average: number,
  goalAchieved: boolean,
  rating: number,
  ratingDescription: string,
}

const calculateExercises = (dailyExHours: number[], goal: number): Result => {
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
  }

  return {
    days,
    trainingDays,
    ogGoal,
    average,
    goalAchieved,
    rating,
    ratingDescription,
  }
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
console.log(calculateExercises([2, 4, 2, 0, 4, 0, 2], 2));
console.log(calculateExercises([5, 4, 2, 3, 4, 1, 3], 3));