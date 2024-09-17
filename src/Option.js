export default function Option({ option, dispatch, i, answer, correctAnswer }) {
  return (
    <button
      className={`btn btn-option ${answer === i ? "answer" : ""} ${
        answer !== null ? (i === correctAnswer ? "correct" : "wrong") : ""
      }`}
      onClick={() => dispatch({ type: "answered", payload: i })}
      disabled={answer !== null}
    >
      {option}
    </button>
  );
}
