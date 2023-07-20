import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useUser } from "../contexts/UserContext";
import styles from "./card.module.css";

// cache and reuse promises based on url (see https://devpress.csdn.net/react/62eb675520df032da732b24a.html)
const createFetch = () => {
  const fetchMap = {};

  return (url, options) => {
    if (!fetchMap[url]) {
      const instance = axios.create({
        baseURL: "https://api.embed.rocks",
        headers: { "x-api-key": import.meta.env.VITE_OG_API_KEY },
      });
      fetchMap[url] = instance.get(url, options);
    }

    return fetchMap[url];
  };
};

function Card({ resource, forceUpdate }) {
  const { user } = useUser();
  const [banner, setBanner] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
  );
  const url = encodeURIComponent(resource.url);
  const fetcher = createFetch();
  useEffect(() => {
    fetcher(`/api?url=${url}`)
      .then((response) => response.data.images?.[0])
      .then((image) => image && setBanner(image?.url))
      .catch((err) => console.error(err));
  }, []);

  const navigate = useNavigate();

  const handleDelete = async () => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
      withCredentials: true,
    });
    try {
      await instance.delete(`/resources/${resource.id}`);
    } catch (err) {
      console.error(err);
    }
    forceUpdate();
  };

  const handleEdit = () => {
    navigate(`/update/${resource.id}`);
  };

  return (
    <div className={styles.card}>
      <header className={styles.heading}>
        <img
          className={styles.image}
          src={banner}
          alt="Represents the article"
        />
        <h1>
          <a href={resource.url}>{resource.title}</a>
        </h1>
        <h2>{resource.type}</h2>
      </header>
      <p>{resource.description}</p>
      <div>topics: {resource.topics}</div>
      {user && (
        <div className={styles.toolBar}>
          <button type="button" aria-label="delete" onClick={handleDelete}>
            <AiFillDelete />
          </button>
          <button type="button" aria-label="edit" onClick={handleEdit}>
            <AiFillEdit />
          </button>
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
  resource: PropTypes.exact({
    id: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.string,
    type: PropTypes.string,
    topics: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  forceUpdate: PropTypes.func.isRequired,
};

export default Card;
