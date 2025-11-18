import type { CoursePart } from '../App';

interface PartProps {
  course: CoursePart;
}

const Part = (props: PartProps) => {
  console.log(props);
  return (
    <div>
      <strong>
        {props.course.name} {props.course.exerciseCount}
      </strong>
    </div>
  )
};

export default Part;