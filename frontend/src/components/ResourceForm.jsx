import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./resource.module.css";
import { useAuth } from "../contexts/AuthContext";

export default function ResourceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const fetcher = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
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
    if (token == null) {
      navigate("/login");
    } else if (id) {
      fetcher
        .get(`/resources/${id}`)
        .then(({ data }) => {
          console.info(data);
          setResource(data);
        })
        .catch((err) => {
          if (err.response.data === "Unauthorized") {
            navigate("/login");
          }
          console.error(err);
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastOptions = {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    };

    if (id) {
      await fetcher.put(`/resources/${id}`, resource);
      toast.success("Update performed", toastOptions);
    } else {
      await fetcher.post("/resources", resource);
      toast.success("Resource created", toastOptions);
    }
    navigate("/");
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
          value={resource.type}
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
