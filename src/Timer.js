import { useEffect } from "react";

export default function Timer({ dispatch, secondsRemaining }) {
  const min = Math.floor(secondsRemaining / 60);
  const second = Math.floor(secondsRemaining % 60);

  useEffect(
    function () {
      const timer = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return function () {
        clearInterval(timer);
      };
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {" "}
      {min < 10 ? "0" : ""}
      {min} : {second < 10 ? "0" : ""}
      {second}
    </div>
  );
}
