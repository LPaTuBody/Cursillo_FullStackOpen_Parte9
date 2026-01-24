

const calculateBmi = (height: number, weight: number): string => {
  // altura en cm y peso en kg
  const imc: number = weight / Math.pow((height / 100), 2);
  let msg: string = "";
  console.log(imc);

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

console.log(calculateBmi(171, 73));