import resources from "./resources";
import Card from "./components/Card";
import "./App.css";

function App() {
  return (
    <>
      {resources.map((rsc) => (
        <Card key={rsc.title} resource={rsc} />
      ))}
    </>
  );
}

export default App;
