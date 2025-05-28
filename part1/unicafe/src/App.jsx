import { useState } from "react";

const Stat = ({ text, stat }) => (
  <p>
    {text} {stat}
  </p>
);

const Statistics = ({ stats }) => {
  const { good, neutral, bad } = stats;
  const total = good + neutral + bad;
  const average = total > 0 ? (good + bad * -1) / total : 0;
  const positivePercent = (good / total) * 100;

  return (
    <>
      <h2>stats</h2>
      <Stat text="good" stat={good} />
      <Stat text="neutral" stat={neutral} />
      <Stat text="bad" stat={bad} />
      <Stat text="all" stat={total} />
      <Stat text="average" stat={average} />
      <Stat text="positive" stat={`${positivePercent}%`} />
    </>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

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
      <Statistics stats={{ good, neutral, bad }} />
    </div>
  );
};

export default App;
