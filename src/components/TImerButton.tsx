import { useEffect, useRef } from "react";

const TimerButton = ({
  background,
  clickFunction,
  buttonText,
  isStartButton = false,
}) => {
  const startButtonRef = useRef(null);

  useEffect(() => {
    if (startButtonRef.current) {
      startButtonRef.current.focus();
    }
  });

  return isStartButton ? (
    <button
      className={`px-4 py-2 rounded-sm ${background} mt-4 shadow-md cursor-pointer active:shadow-sm active:font-bold`}
      onClick={clickFunction}
      ref={startButtonRef}
    >
      {buttonText}
    </button>
  ) : (
    <button
      className={`px-4 py-2 rounded-sm ${background} mt-4 shadow-md cursor-pointer active:shadow-sm active:font-bold`}
      onClick={clickFunction}
    >
      {buttonText}
    </button>
  );
};

export default TimerButton;
