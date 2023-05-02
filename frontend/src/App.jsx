import resources from "./resources";
import Card from "./components/Card";
import "./App.css";

function App() {
  return (
    <main>
      {resources.map((rsc) => (
        <Card key={rsc.title} resource={rsc} />
      ))}
    </main>
  );
}

export default App;
