interface CourseParts {
  name: string
  exerciseCount: number
}

interface ContentProps {
  courseParts: CourseParts[]
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((cp) => (
        <p>{cp.name} {cp.exerciseCount}</p>
      ))}
    </div>
  );
};

export default Content;