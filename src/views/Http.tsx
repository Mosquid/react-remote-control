import { FC, useState } from "react";
import Joystick, { MoveObject } from "../components/joystick";
import { useHttpTransport } from "../hooks";

const HttpView: FC<{}> = () => {
  const { hostname } = window.location;
  const [apiUrl, setApiUrl] = useState(`http://${hostname}`);
  const { loading, error, chain } = useHttpTransport(apiUrl);

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
      <input
        type="text"
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
      />
    </>
  );
};

export default HttpView;
