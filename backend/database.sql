CREATE TABLE user
  (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(80) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(80) NOT NULL,
    PRIMARY KEY (id)
  );

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

INSERT INTO resources
  (title, url, type, topics, description)
  VALUES
  (
    "Toxicode's Silent Teacher",
    "https://silentteacher.toxicode.fr/",
    "Practice",
    "Practice / Exercise",
    "Interface web ludique pour vous aider à comprendre quelques bases JS/Algo."
  ),
  (
    "Scrimba's React free course",
    "https://scrimba.com/learn/learnreact/",
    "Alternative class",
    "React",
    "Un cours bien construit (en anglais) avec de l'interactivité pour appliquer les concepts"
  ),
  (
    "Exercism",
    "https://exercism.org",
    "Practice / Exercise",
    "Algorithms, Javascript",
    "Des challenge JS avec une progression en difficulté, accès a des mentor pour review votre code gratuitement"
  ),
  (
    "Codewars",
    "https://codewars.com",
    "Practice / Exercise",
    "Katas",
    "Plus de katas JS."
  ),
  (
    "Can I Use?",
    "https://caniuse.com/",
    "Dev tools",
    "HTML, Javascript, CSS",
    "Pour savoir si une fonctionnalité est gérée par les navigateurs"
  ),
  (
    "Pexel",
    "https://www.pexels.com/fr-fr/",
    "Images and videos",
    "Assets, Images, Videos",
    "Images et vidéos libre de droit/ banque d'images et photos gratuite"
  ),
  (
    "Freepik",
    "https://fr.freepik.com/",
    "Images and videos",
    "Algorithms, Javascript",
    "Interface web ludique pour vous aider à comprendre quelques bases JS/Algo."
  ),
  (
    "Logoipsum",
    "https://logoipsum.com/",
    "Practice / Exercise",
    "Mockups, UX/UI",
    "faire un mockup de logo"
  ),
  (
    "React GG",
    "https://react.gg/ ",
    "Alternative class",
    "React",
    "Un site interactif qui présente brièvement React, d'une manière intéressante"
  );
