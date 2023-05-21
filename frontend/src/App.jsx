import { useState, useEffect } from "react";
import Card from "./components/Card";
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
    <main>
      {resources?.map((rsc) => (
        <Card key={rsc.id} resource={rsc} />
      ))}
    </main>
  );
}

export default App;
