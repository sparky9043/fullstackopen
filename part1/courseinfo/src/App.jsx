const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </>
  );
};

const Total = (props) => {
  const exercisesOnly = props.parts.map((part) => part.exercises);
  const totalExercises = exercisesOnly.reduce((prev, curr) => prev + curr, 0);

  return <p>Number of exercises {totalExercises}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
