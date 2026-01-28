interface TotalProps {
  totalExercises: number
}

const Total = ({ totalExercises }: TotalProps) => {
  return (
    <p style={{ fontSize: "20px" }}>
      <strong>Number of exercises:</strong> {totalExercises}
    </p>
  )
};

export default Total;