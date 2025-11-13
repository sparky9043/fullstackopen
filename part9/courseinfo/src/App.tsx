import Content from './components/Content';
import Title from './components/Title';

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Title text={courseName} />
      {courseParts.map(course =>
        <Content
          key={course.name}
          courseName={course.name}
          exerciseCount={course.exerciseCount}
        />
      )}
      <p>
        Number of exercises {totalExercises}
      </p>
    </div>
  );
};

export default App;