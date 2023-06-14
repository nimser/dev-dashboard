import { useState, useEffect } from "react";
import Card from "./Card";

export default function CardList() {
  const [resources, setResources] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/resources`
        );
        const result = await data.json();
        setResources(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [isUpdated]);

  return resources?.map((rsc) => (
    <Card key={rsc.id} resource={rsc} setIsUpdated={setIsUpdated} />
  ));
}
