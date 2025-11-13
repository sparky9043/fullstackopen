interface ContentProps {
  courses: Course[],
};

interface Course {
  name: string,
  exerciseCount: number,
};

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courses.map((course: Course) => <p key={course.name}>
        {course.name} {course.exerciseCount}
      </p>)}
    </div>
  )
}

export default Content;