import type { JSX } from "react";
import type { CoursePart } from "../types";

const renderPart = (part: CoursePart): JSX.Element => {
  switch (part.kind) {
    case "basic":
      return (
        <p key={part.name}>
          <strong>{part.name} - {part.exerciseCount}</strong><br />
          <em>{part.description}</em>
        </p>
      );
    case "group":
      return (
        <p key={part.name}>
          <strong>{part.name} - {part.exerciseCount}</strong><br />
          Project groups: {part.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p key={part.name}>
          <strong>{part.name} - {part.exerciseCount}</strong><br />
          <em>{part.description}</em><br />
          Support material: {part.backgroundMaterial}
        </p>
      );
    case "special":
      return (
        <p key={part.name}>
          <strong>{part.name} - {part.exerciseCount}</strong><br />
          <em>{part.description}</em><br />
          Required skills: {part.requirements.join(", ")}
        </p>
      );
    default:
      const wrongKind: never = part;
      return wrongKind;
  };
};

export default renderPart;