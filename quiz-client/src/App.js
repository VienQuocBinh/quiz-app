import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Authenticate from "./components/Authenticate";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { ContextProvider } from "./hooks/useStateContext";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route element={<Authenticate />}>
            <Route path="/" element={<Layout />}>
              <Route path="/quiz" element={<Quiz />}></Route>
              <Route path="/result" element={<Result />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
