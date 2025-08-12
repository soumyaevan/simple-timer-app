import { useEffect, useRef, useState } from "react";
import TimerButton from "./TImerButton";

const Timer = () => {
  const timeRef = useRef(null);
  const audioRef = useRef(null);
  const [time, setTime] = useState(0);
  const [isTimeRunning, setIsTimeRunning] = useState(false);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((e) => console.log("Audio playing failed", e));
    }
  };

  const toggleTimer = () => {
    if (isTimeRunning) {
      clearInterval(timeRef.current);
      timeRef.current = null;
    } else {
      timeRef.current = setInterval(() => {
        setTime((nextTime) => {
          if (nextTime <= 1) {
            clearInterval(timeRef.current);
            setIsTimeRunning(false);
            playSound();
            return 0;
          }
          return nextTime - 1;
        });
      }, 1000);
    }
    setIsTimeRunning(!isTimeRunning);
  };
  const resetTimer = () => {
    clearInterval(timeRef.current);
    setTime(0);
    timeRef.current = null;
    setIsTimeRunning(false);
  };

  return (
    <>
      <div className="mt-2 mb-4 max-w-md text-center mx-auto">
        <img src="/SreeSreeThakur.png" />
      </div>
      <div className="max-w-md mx-auto text-center mt-10 bg-zinc-500 p-6 shadow-lg rounded-sm">
        <audio ref={audioRef} preload="auto">
          <source src="/VanedPurushottamam.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <div className="mb-8 flex justify-center items-center w-full gap-4">
          <TimerButton
            background={"bg-blue-700"}
            clickFunction={() => setTime(300)}
            buttonText={"5 mins"}
          />
          <TimerButton
            background={"bg-blue-700"}
            clickFunction={() => setTime(120)}
            buttonText={"2 mins"}
          />
        </div>
        <h2 className="font-bold">⏳ Timer: {formatTime(time)}</h2>
        <div className="mb-8 flex justify-center items-center w-full gap-4">
          <TimerButton
            background={"bg-green-700"}
            clickFunction={toggleTimer}
            buttonText={isTimeRunning ? "Pause" : "Start"}
          />
          <TimerButton
            background={"bg-amber-700"}
            clickFunction={resetTimer}
            buttonText={"Reset"}
          />
        </div>
      </div>
    </>
  );
};

export default Timer;
