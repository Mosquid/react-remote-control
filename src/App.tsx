import Button from "./components/button";
import Joystick, { MoveObject } from "./components/joystick";
import { BaseColors } from "./interfaces/colors";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useState } from "react";

const SOCKET_URL = "ws://10.0.0.10:1488";

function App() {
  const [wsUrl, setWsUrl] = useState(SOCKET_URL);
  const { sendMessage, readyState } = useWebSocket(wsUrl);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const handleJoystickMove = (move: MoveObject) => {
    sendMessage(JSON.stringify(move));
  };

  const handleStop = () => {
    sendMessage(JSON.stringify({ left: 0, right: 0 }));
  };

  return (
    <div className="App" style={{ padding: 100 }}>
      <Joystick
        disabled={connectionStatus !== "Open"}
        onStop={handleStop}
        onMove={handleJoystickMove}
      />
      <Button onPressIn={console.log} onPressOut={console.log}>
        Test Button
      </Button>
      <Button
        color={BaseColors.red}
        onPressIn={console.log}
        onPressOut={console.log}
      />
      <div style={{ paddingTop: 50 }}>
        <input
          type="text"
          value={wsUrl}
          onChange={(e) => setWsUrl(e.target.value)}
        />
      </div>
    </div>
  );
}

export default App;
