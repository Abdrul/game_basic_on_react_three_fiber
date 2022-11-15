import React, { useRef, useEffect } from "react";
import { useKeyboardControls } from "@react-three/drei";
import useGames from "./stores/useGames";
import { addEffect } from "@react-three/fiber";

export default function Interface() {
  const time = useRef();

  useEffect(() => {
    const effectTick = addEffect(() => {
      const state = useGames.getState();
      // console.log(state);

      let elapsedTime = 0;
      if (state.phase === "playing") elapsedTime = Date.now() - state.startTime;
      else if (state.phase === "ended")
        elapsedTime = state.endTime - state.startTime;

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) time.current.textContent = elapsedTime;
    });

    return () => {
      effectTick();
    };
  }, []);

  const restart = useGames((state) => state.restart);
  const phase = useGames((state) => state.phase);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  return (
    <div className="interface">
      <div className="time" ref={time}>
        0.00
      </div>

      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}

      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : null}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${leftward ? "active" : null}`}></div>
          <div className={`key ${backward ? "active" : null}`}></div>
          <div className={`key ${rightward ? "active" : null}`}></div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? "active" : null}`}></div>
        </div>
      </div>
    </div>
  );
}
