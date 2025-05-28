import { useState } from "react";

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>

    <td>{value}</td>
  </tr>
);

const Statistics = ({ stats }) => {
  const { good, neutral, bad } = stats;
  const total = good + neutral + bad;
  const average = total > 0 ? (good + bad * -1) / total : 0;
  const positivePercent = (good / total) * 100;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={`${positivePercent}%`} />
      </tbody>
    </table>
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
      <h2>stats</h2>
      <Statistics stats={{ good, neutral, bad }} />
    </div>
  );
};

export default App;
