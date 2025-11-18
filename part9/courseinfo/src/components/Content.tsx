import type { CoursePart } from '../App'

interface ContentProps {
  courses: CoursePart[],
};

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courses.map((course: CoursePart) => <p key={course.name}>
        {course.name} {course.exerciseCount}
      </p>)}
    </div>
  )
}

export default Content;