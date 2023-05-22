import { useEffect, useState } from "react";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [resources, setResources] = useState(null);
  useEffect(() => {
    async function fetchResources() {
      try {
        const data = await fetch("http://localhost:5000/resources");
        const result = await data.json();
        setResources(result);
      } catch (err) {
        console.error(err);
      }
    }
    fetchResources();
  }, []);
  return (
    <main>
      {resources?.map((rsc) => (
        <Card key={rsc.title} resource={rsc} />
      ))}
    </main>
  );
}

export default App;
