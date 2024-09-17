import StartScreen from "./StartScreen.js";
import Header from "./Header.js";
import Progress from "./Progress.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import Question from "./Question.js";
import { useEffect, useReducer } from "react";
import Timer from "./Timer.js";
import FinishScreen from "./FinishScreen.js";
const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  points: 0,
  answer: null,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  const currentQuestion = state.questions[state.index];

  switch (action.type) {
    case "gamerReady":
      return { ...state, questions: action.payload, status: "ready" };
    case "error":
      return { ...state, status: "error" };
    case "startGame":
      return {
        ...state,
        status: "start",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "nextQuestion":
      return { ...state, answer: null, index: state.index + 1 };
    case "finishTheGame":
      return {
        ...state,
        status: "finished",
        highscore:
          state.highscore > state.points ? state.highscore : state.points,
      };
    case "answered":
      return {
        ...state,
        points:
          currentQuestion.correctOption === action.payload
            ? state.points + currentQuestion.points
            : state.points,
        answer: action.payload,
      };
    case "restartQuiz":
      return {
        ...initialState,
        highscore: state.highscore,
        status: "ready",
        questions: state.questions,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
  }
}
function App() {
  const [
    { questions, status, index, points, answer, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const questionLength = questions.length;
  const question = questions[index];
  const maxPoints = questions.reduce((acc, currentQuestion) => {
    return acc + currentQuestion.points;
  }, 0);
  console.log(secondsRemaining);

  useEffect(function () {
    fetch("http://localhost:8080/questions")
      .then((resp) => resp.json())
      .then((data) => dispatch({ type: "gamerReady", payload: data }))
      .catch((err) => dispatch({ type: "error", payload: err }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen questionsLength={questionLength} dispatch={dispatch} />
        )}
        {status === "error" && <Error />}
        {status === "start" && (
          <>
            <Progress
              index={index}
              questionLength={questionLength}
              maxPoints={maxPoints}
              points={points}
              answer={answer}
            />
            <Question
              question={question}
              dispatch={dispatch}
              key={question.id}
              questionLength={questionLength}
              index={index}
              answer={answer}
            />
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
