import Button from "./components/button";
import Joystick, { MoveObject } from "./components/joystick";
import { Colors } from "./Theme";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useState } from "react";
import "./App.css";
import Toggle from "./components/toggle";

const SOCKET_URL = "ws://10.0.0.10:1488";

function App() {
  const [wsUrl, setWsUrl] = useState(SOCKET_URL);
  const [light, setLight] = useState(false);
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

  const sendBeep = () => {
    sendMessage(JSON.stringify({ light: 1 }));
  };

  // const { hostname } = window.location;
  const hostname = "192.168.1.29";
  return (
    <div className="App">
      <iframe title="Stream" src={`http://${hostname}:8000`} />
      <div style={{ marginBottom: 20 }}>
        <div className="grid">
          <div>
            <label>Beep</label>
            <br />
            <Button
              onPressIn={sendBeep}
              color={Colors.red}
              onPressOut={() => console.log}
            />
          </div>
          <Toggle onChange={setLight} active={light} label="Lights" />
        </div>
      </div>
      <Joystick
        disabled={connectionStatus !== "Open"}
        onStop={handleStop}
        onMove={handleJoystickMove}
      />
      <div style={{ paddingTop: 50 }}>
        <p>{connectionStatus}</p>
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
