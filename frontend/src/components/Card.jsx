import PropTypes from "prop-types";
import styles from "./card.module.css";

function Card({ resource }) {
  return (
    <div className={styles.card}>
      <header>
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
