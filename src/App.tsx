import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import HttpView from "./views/Http";
import WebscoketView from "./views/Websocket";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WebscoketView />} />
          <Route path="/http" element={<HttpView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
