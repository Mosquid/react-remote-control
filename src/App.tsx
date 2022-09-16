import Button from "./components/button";
import { BaseColors } from "./interfaces/colors";

function App() {
  return (
    <div className="App">
      <Button onPressIn={console.log} onPressOut={console.log}>
        Test Button
      </Button>
      <Button
        color={BaseColors.red}
        onPressIn={console.log}
        onPressOut={console.log}
      />
    </div>
  );
}

export default App;
