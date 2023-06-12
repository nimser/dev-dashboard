import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
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

function Card({ resource }) {
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
      <div className={styles.toolBar}>
        <button type="button" aria-label="delete">
          <AiFillDelete />
        </button>
        <button type="button" aria-label="edit">
          <AiFillEdit />
        </button>
      </div>
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
};

export default Card;
