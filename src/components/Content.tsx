import type { CoursePart } from "../types";
import renderPart from "./Part";

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map(renderPart)}
    </div>
  );
};

export default Content;