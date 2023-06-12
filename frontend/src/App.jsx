import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import CardList from "./components/CardList";
import ResourceForm from "./components/ResourceForm";
import "./App.css";

function App() {
  const [resources, setResources] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("http://localhost:5000/resources");
        const result = await data.json();
        setResources(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<CardList resources={resources} />} />
          <Route path="/create" element={<ResourceForm />} />
          <Route path="/update/:id" element={<ResourceForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
