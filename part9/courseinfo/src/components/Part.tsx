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
        return <div>
          <em>
            {props.course.description}
          </em>
        </div>
      case 'group':
        return <div>
          <em>
            project exercises {props.course.groupProjectCount}
          </em>
        </div>
      case 'background':
        return <div>
          <em>
            {props.course.description}
          </em>
          <div>
            submit to&nbsp;
              {props.course.backgroundMaterial}
          </div>
        </div>
      case 'special':
        return <div>
          <em>
            {props.course.description}
          </em>
          <div>
            required skills: {props.course.requirements.join(', ')}
          </div>
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