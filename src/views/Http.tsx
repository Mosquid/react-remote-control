import { FC } from "react";
import Joystick, { MoveObject } from "../components/joystick";
import { useHttpTransport } from "../hooks";

const HttpView: FC<{}> = () => {
  const { loading, error, post } = useHttpTransport("http://10.0.0.12");

  const handleStop = () => {
    console.log("stop");
  };

  const handleJoystickMove = (move: MoveObject) => {
    post(move);
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
