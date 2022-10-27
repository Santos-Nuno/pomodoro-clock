import { useState } from "react";
import LengthControl from "./components/LengthControl";
import "./App.css";

let refreshIntervalId = 0;
let defaultBreakTime = 5 * 60;
let defaultSessionTime = 25 * 60;

export default function App() {
  const [times, setTimes] = useState({
    breakTime: defaultBreakTime,
    sessionTime: defaultSessionTime,
    stage: "session",
    remainingTime: defaultSessionTime,
  });

  function modifyBreakTime(e) {
    if (!refreshIntervalId) {
      let amount = parseInt(e.target.value, 10);
      setTimes((prevTimes) => {
        if (prevTimes.stage === "break") {
          return {
            ...prevTimes,
            breakTime: prevTimes.breakTime + amount,
            remainingTime: prevTimes.breakTime + amount,
          };
        } else {
          return {
            ...prevTimes,
            breakTime: prevTimes.breakTime + amount,
          };
        }
      });
    }
  }

  function modifySessionTime(e) {
    if (!refreshIntervalId) {
      let amount = parseInt(e.target.value, 10);
      setTimes((prevTimes) => {
        if (prevTimes.stage === "session") {
          return {
            ...prevTimes,
            sessionTime: prevTimes.sessionTime + amount,
            remainingTime: prevTimes.sessionTime + amount,
          };
        } else {
          return {
            ...prevTimes,
            sessionTime: prevTimes.sessionTime + amount,
          };
        }
      });
    }
  }

  function startStopCountdown() {
    if (refreshIntervalId) {
      stopCountdown();
    } else {
      refreshIntervalId = setInterval(manageRemainingTime, 1000);
    }
  }

  function stopCountdown() {
    clearInterval(refreshIntervalId);
    refreshIntervalId = 0;
  }

  function manageRemainingTime() {
    if (document.getElementById("time-left").innerText === "00:00") {
      swapState();
    } else {
      reduceRemainingTime();
    }
  }

  function reduceRemainingTime() {
    setTimes((prevTimes) => {
      return {
        ...prevTimes,
        remainingTime: prevTimes.remainingTime - 1,
      };
    });
  }

  function reset() {
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    stopCountdown();
    setTimes((prevTimes) => {
      return {
        breakTime: defaultBreakTime,
        sessionTime: defaultSessionTime,
        stage: "session",
        remainingTime: defaultSessionTime,
      };
    });
  }

  function swapState() {
    setTimes((prevTimes) => {
      if (prevTimes.stage === "session") {
        return {
          ...prevTimes,
          stage: "break",
          breakTime: prevTimes.breakTime,
          remainingTime: prevTimes.breakTime,
        };
      } else {
        return {
          ...prevTimes,
          stage: "session",
          sessionTime: prevTimes.sessionTime,
          remainingTime: prevTimes.sessionTime,
        };
      }
    });
    playBeep();
  }

  function playBeep() {
    document.getElementById("beep").play();
  }

  return (
    <div id="app" className={times.stage}>
      <h1>Pomodoro clock</h1>
      <div id="pomodoro-clock">
        <div id="timer" className={times.stage}>
          <div id="timer-label">
            {times.stage[0].toUpperCase() + times.stage.substring(1)}
          </div>
          <div id="time-left">{`${
            Math.floor(times.remainingTime / 60) < 10 ? 0 : ""
          }${Math.floor(times.remainingTime / 60)}:${
            times.remainingTime % 60 < 10 ? 0 : ""
          }${times.remainingTime % 60}`}</div>
          <button id="start_stop" onClick={startStopCountdown} className="btn-large purple lighten-2">
            <i className="material-icons" alt="play/pause">
              play_circle_outline
            </i>
            <img
              id="play-icon"
              src={`./images/play.svg`}
              alt="play"
            />
            <img id="pause-icon" src={`./images/pause.svg`} alt="pause" />
          </button>
          <button id="reset" onClick={reset} className="btn-large purple lighten-2">
            <i className="material-icons" alt="reset">
              loop
            </i>
          </button>
          <audio id="beep" src="./beep.mp3">
            Your browser does not support the audio tag.
          </audio>
        </div>
        <br />
        <LengthControl
          type="break"
          length={times.breakTime / 60}
          functionClick={modifyBreakTime}
        />
        <LengthControl
          type="session"
          length={times.sessionTime / 60}
          functionClick={modifySessionTime}
        />
      </div>
    </div>
  );
}
