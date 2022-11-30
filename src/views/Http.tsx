import { FC } from "react";
import Joystick, { MoveObject } from "../components/joystick";
import { useHttpTransport } from "../hooks";

const HttpView: FC<{}> = () => {
  const { loading, error, chain } = useHttpTransport("http://10.0.0.10");

  const handleStop = () => {
    console.log("stop");
    chain({ x: 0, y: 0 });
  };

  const handleJoystickMove = (move: MoveObject) => {
    const { x, y } = move;
    chain({ x, y });
  };

  return (
    <>
      <Joystick onStop={handleStop} onMove={handleJoystickMove} />
      <div>Loading: {loading}</div>
      <div>Error: {error?.message}</div>
    </>
  );
};

export default HttpView;
