import type { CoursePartBase } from '../App'

interface ContentProps {
  courses: CoursePartBase[],
};

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courses.map((course: CoursePartBase) => <p key={course.name}>
        {course.name} {course.exerciseCount}
      </p>)}
    </div>
  )
}

export default Content;