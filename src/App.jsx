import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Moon from "./pages/Moon";
import Mars from "./pages/Mars";

import { ProgressProvider } from "./context/ProgressContext";

import "./App.css";

function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/moon" element={<Moon />} />
          <Route path="/mars" element={<Mars />} />
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  );
}

export default App;