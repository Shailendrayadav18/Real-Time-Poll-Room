import { BrowserRouter, Routes, Route } from "react-router-dom";
import Poll from "./pages/Poll";
import CreatePoll from "./pages/CreatePoll";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreatePoll />} />
        <Route path="/poll/:pollId" element={<Poll />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

