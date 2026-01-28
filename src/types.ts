interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface withDesc extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends withDesc {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends withDesc {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends withDesc {
  requirements: string[]
  kind: "special"
}

export type CoursePart =
  CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;