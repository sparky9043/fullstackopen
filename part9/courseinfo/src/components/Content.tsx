interface ContentProps {
  courseName: string,
  exerciseCount: number,
};

const Content = (props: ContentProps) => {
  return (
    <p>
      {props.courseName} {props.exerciseCount}
    </p>
  )
}

export default Content;