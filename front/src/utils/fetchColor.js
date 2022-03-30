import LANGUAGE from "./languages";
const fetchColor = (type) => {
  switch (type.toLowerCase()) {
    case LANGUAGE.javascript:
      return "#f8c63d";
    case LANGUAGE.python:
      return "#f8c63d";
    case LANGUAGE.java:
      return "#ef8587";
    case LANGUAGE.php:
      return "#007bff";
    case LANGUAGE.kotlin:
      return "#010101";
    default:
      return "#010101";
  }
};

export default fetchColor;
