import Option from "./Option";
export default function Question({
  question,
  dispatch,
  index,
  questionLength,
  answer,
}) {
  const isLastQuestion = index + 1 === questionLength;
  const correctAnswer = question.correctOption;

  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, i) => (
          <Option
            option={option}
            dispatch={dispatch}
            i={i}
            answer={answer}
            correctAnswer={correctAnswer}
          />
        ))}
      </div>

      {answer !== null && (
        <button
          className="btn btn-ui"
          onClick={() =>
            dispatch({
              type: isLastQuestion ? "finishTheGame" : "nextQuestion",
            })
          }
        >
          {isLastQuestion ? "Finish" : "Next"}
        </button>
      )}
    </div>
  );
}
