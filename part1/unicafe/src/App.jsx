import { useState } from "react";

const Stats = ({ text, stat }) => (
  <p>
    {text} {stat}
  </p>
);

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;

  function handleGood() {
    setGood((good) => good + 1);
  }

  function handleNeutral() {
    setNeutral((neutral) => neutral + 1);
  }

  function handleBad() {
    setBad((bad) => bad + 1);
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" onClick={handleGood} />
      <Button text="neutral" onClick={handleNeutral} />
      <Button text="bad" onClick={handleBad} />
      <h2>stats</h2>
      <Stats text="good" stat={good} />
      <Stats text="neutral" stat={neutral} />
      <Stats text="bad" stat={bad} />
      <Stats text="all" stat={total} />
    </div>
  );
};

export default App;
