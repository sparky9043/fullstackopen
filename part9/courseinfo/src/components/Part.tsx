import type { CoursePart } from '../App';

interface PartProps {
  course: CoursePart;
}

const Part = (props: PartProps) => {
  const courseParts = (): React.ReactNode | never => {
    const assertNever = (value: never): never => {
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
    };

    switch (props.course.kind) {
      case 'basic':
        return <p>
          <em>
            {props.course.description}
          </em>
        </p>
      case 'group':
        return <p>
          <em>
            project exercises {props.course.groupProjectCount}
          </em>
        </p>
      case 'background':
        return <div>
          <em>
            {props.course.description}
          </em>
          <p>
            submit to&nbsp;
              {props.course.backgroundMaterial}
          </p>
        </div>
      case 'special':
        return <div>
          <em>
            {props.course.description}
          </em>
          <p>
            required skills: {props.course.requirements.join(', ')}
          </p>
        </div>
      default:
        return assertNever(props.course);
    }
  }

  return (
    <div>
      <strong>
        {props.course.name} {props.course.exerciseCount}
      </strong>
      {courseParts()}
    </div>
  )
};

export default Part;