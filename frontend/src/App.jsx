import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import CardList from "./components/CardList";
import ResourceForm from "./components/ResourceForm";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<CardList />} />
          <Route path="/create" element={<ResourceForm />} />
          <Route path="/update/:id" element={<ResourceForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
