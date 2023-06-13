import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./resource.module.css";

export default function ResourceForm() {
  const { id } = useParams();
  const typeEnum = [
    "Practice / Exercise",
    "Alternative class",
    "Images and videos",
    "Article",
    "Dev tools",
    "Other",
  ];
  const [resource, setResource] = useState({
    title: "",
    url: "",
    type: typeEnum[0],
    topics: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/resources/${id}`)
        .then(({ data }) => {
          console.info(data);
          setResource(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const instance = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
      headers: { "Content-Type": "application/json" },
    });
    if (id) {
      instance.put(`/resources/${id}`, resource);
    } else {
      instance.post("/resources", resource);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="title">
        Title
        <input
          id="title"
          type="text"
          name="title"
          value={resource.title}
          placeholder="Type your title"
          onChange={(e) => setResource({ ...resource, title: e.target.value })}
        />
      </label>

      <label htmlFor="url">
        Url
        <input
          id="url"
          type="text"
          name="url"
          value={resource.url}
          placeholder="URL for the resource"
          onChange={(e) => setResource({ ...resource, url: e.target.value })}
        />
      </label>

      <label htmlFor="type">
        Type
        <select
          name="type"
          id="type"
          onChange={(e) => setResource({ ...resource, type: e.target.value })}
        >
          {typeEnum.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="topics">
        Topics
        <input
          id="topics"
          type="text"
          name="topics"
          value={resource.topics}
          placeholder="Type your tag"
          onChange={(e) => setResource({ ...resource, topics: e.target.value })}
        />
      </label>

      <label htmlFor="description">
        Description
        <input
          id="description"
          type="textarea"
          name="description"
          value={resource.description}
          placeholder="Type your description"
          onChange={(e) =>
            setResource({ ...resource, description: e.target.value })
          }
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}
