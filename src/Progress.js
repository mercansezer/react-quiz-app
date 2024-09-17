export default function Progress({
  index,
  questionLength,
  maxPoints,
  points,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={questionLength}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question
        <strong> {index + 1} </strong>/ {questionLength}
      </p>
      <p>
        <strong> {points} </strong>/ {maxPoints}
      </p>
    </header>
  );
}
