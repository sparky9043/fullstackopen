const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0]} exercise={props.exercises[0]} />
      <Part part={props.parts[1]} exercise={props.exercises[1]} />
      <Part part={props.parts[2]} exercise={props.exercises[2]} />
    </>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  // const part1 = "Fundamentals of React";
  // const exercises1 = 10;
  // const part2 = "Using props to pass data";
  // const exercises2 = 7;
  // const part3 = "State of a component";
  // const exercises3 = 14;

  // const part1 = {
  //   name: "Fundamentals of React",
  //   exercises: 10,
  // };
  // const part2 = {
  //   name: "Using props to pass data",
  //   exercises: 7,
  // };
  // const part3 = {
  //   name: "State of a component",
  //   exercises: 14,
  // };

  const parts = [
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
  ];

  return (
    <div>
      <Header course={course} />
      <Content
        parts={[parts[0].name, parts[1].name, parts[2].name]}
        exercises={[parts[0].exercises, parts[1].exercises, parts[2].exercises]}
      />
      <Total
        total={parts[0].exercises + parts[1].exercises + parts[2].exercises}
      />
    </div>
  );
};

export default App;
