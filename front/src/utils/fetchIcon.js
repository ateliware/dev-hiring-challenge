import iconJavascript from "../assets/png/javascript.png";
import iconPython from "../assets/png/python.png";
import iconJava from "../assets/png/java.png";
import iconPHP from "../assets/png/php.png";
import iconKotlin from "../assets/png/kotlin.png";
import LANGUAGE from "./languages";

const fetchIcon = (type) => {
  switch (type.toLowerCase()) {
    case LANGUAGE.javascript:
      return iconJavascript;
    case LANGUAGE.python:
      return iconPython;
    case LANGUAGE.java:
      return iconJava;
    case LANGUAGE.php:
      return iconPHP;
    case LANGUAGE.kotlin:
      return iconKotlin;
    default:
      return iconJavascript;
  }
};

export default fetchIcon;
