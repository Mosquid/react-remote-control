import Button from "./components/button";
import Joystick from "./components/joystick";
import { BaseColors } from "./interfaces/colors";

function App() {
  return (
    <div className="App" style={{ padding: 100 }}>
      <Button onPressIn={console.log} onPressOut={console.log}>
        Test Button
      </Button>
      <Button
        color={BaseColors.red}
        onPressIn={console.log}
        onPressOut={console.log}
      />
      <Joystick />
    </div>
  );
}

export default App;
