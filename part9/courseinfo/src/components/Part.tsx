import type { CoursePart } from '../App';

interface PartProps {
  course: CoursePart;
}

const Part = (props: PartProps) => {
  console.log(props);
  return (
    <p>Part activated</p>
  )
};

export default Part;