import PropTypes from "prop-types";

function Card({ resource }) {
  return (
    <div style={{ border: "2px solid black" }}>
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
