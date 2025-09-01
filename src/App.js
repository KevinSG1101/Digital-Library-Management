import "./App.css";
import Book from "./Book/Book";
import Login from "./Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route path="book/*" element={<Book />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
