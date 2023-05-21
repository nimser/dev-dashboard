import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./card.module.css";

function Card({ resource }) {
  const [banner, setBanner] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
  );
  const url = encodeURIComponent(resource.url);
  const instance = axios.create({
    baseURL: "https://api.embed.rocks",
    headers: { "x-api-key": import.meta.env.VITE_OG_API_KEY },
  });
  useEffect(
    () => {
      instance
        .get(`/api?url=${url}`)
        .then((response) => response.data.images?.[0])
        .then((image) => image && setBanner(image?.url))
        .catch((err) => console.error(err));
    },
    // FIXME return AbortController cleanup
    []
  );

  return (
    <div className={styles.card}>
      <header className={styles.heading}>
        <img src={banner} alt="Represents the article" />
        <h1>
          <a href={resource.url}>{resource.title}</a>
        </h1>
        <h2>{resource.type}</h2>
      </header>
      <p>{resource.description}</p>
      <div>topics: {resource.topics.join(", ")}</div>
    </div>
  );
}

Card.propTypes = {
  resource: PropTypes.exact({
    title: PropTypes.string,
    url: PropTypes.string,
    type: PropTypes.string,
    topics: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
  }).isRequired,
};

export default Card;
