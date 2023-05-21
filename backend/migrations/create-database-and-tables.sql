CREATE DATABASE resources_dashboard;
USE resources_dashboard;
CREATE TABLE resources
  (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100),
    url VARCHAR(200),
    type VARCHAR(200),
    topics VARCHAR(200),
    description VARCHAR(1500),
    PRIMARY KEY (id)
  );
