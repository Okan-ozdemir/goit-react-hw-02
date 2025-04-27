import { useState, useEffect } from "react";

const App = () => {
  const [feedback, setFeedback] = useState(() => {
    try {
      const saved = localStorage.getItem("feedback-stats");
      return saved ? JSON.parse(saved) : { good: 0, neutral: 0, bad: 0 };
    } catch {
      return { good: 0, neutral: 0, bad: 0 };
    }
  });

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positivePercentage =
    totalFeedback > 0 ? Math.round((feedback.good / totalFeedback) * 100) : 0;

  useEffect(() => {
    localStorage.setItem("feedback-stats", JSON.stringify(feedback));
  }, [feedback]);

  return (
    <div className="app">
      <h2>Sip Happens Café</h2>
      <p>
        Please leave your feedback about our service by selecting one of the
        options below.
      </p>

      <Options
        onFeedback={(type) =>
          setFeedback((prev) => ({ ...prev, [type]: prev[type] + 1 }))
        }
        onReset={() => setFeedback({ good: 0, neutral: 0, bad: 0 })}
        showReset={totalFeedback > 0}
      />

      {totalFeedback > 0 ? (
        <Statistics
          feedback={feedback}
          total={totalFeedback}
          positivePercentage={positivePercentage}
        />
      ) : (
        <Notification message="No feedback yet." />
      )}
    </div>
  );
};

const Options = ({ onFeedback, onReset, showReset }) => (
  <div className="options-container">
    <div className="options">
      <button onClick={() => onFeedback("good")}>Good 👍</button>
      <button onClick={() => onFeedback("neutral")}>Neutral 😐</button>
      <button onClick={() => onFeedback("bad")}>Bad 👎</button>
      {showReset && (
        <button className="reset-btn" onClick={onReset}>
          Reset
        </button>
      )}
    </div>
  </div>
);

const Statistics = ({ feedback, total, positivePercentage }) => (
  <div className="stats">
    <h2>Statistics</h2>
    <ul>
      <li>Good: {feedback.good}</li>
      <li>Neutral: {feedback.neutral}</li>
      <li>Bad: {feedback.bad}</li>
      <li className="total">Total: {total}</li>
      <li className="positive">Positive: {positivePercentage}%</li>
    </ul>
  </div>
);

const Notification = ({ message }) => (
  <div className="notification">
    <p>{message}</p>
  </div>
);

export default App;
