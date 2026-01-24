const parseArguments = (args: string[]): {
  height: number,
  weight: number,
} => {
  if (args.length !== 4) throw new Error("Incorrect amount of arguments provided.");

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (!isNaN(height) && !isNaN(weight)) {
    return { height, weight };
  } else {
    throw new Error("Provided values need to be numbers.");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  // altura en cm y peso en kg
  const imc: number = weight / Math.pow((height / 100), 2);
  let msg: string = "";

  if (imc < 18.5) {
    msg = "Low - Weight below what is considered healthy.";
  } else if (imc >= 18.5 && imc < 24.9) {
    msg = "Normal - Healthy weigth.";
  } else if (imc >= 24.9 && imc < 29.9) {
    msg = "Overweigth - weight slightly above healthy parameters.";
  } else {
    msg = "Obesity - weight well above healthy parameters.";
  }

  return msg;
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (err: unknown) {
  let errMsg = "Something went wrong. ";
  if (err instanceof Error) {
    errMsg += err.message;
  }
  console.log(errMsg);
};