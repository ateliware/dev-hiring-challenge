import React, { Component } from "react";
import { Link } from "react-router-dom";
import words from "../components/words";
import Typed from "typed.js";

export default class Search extends Component {
  handleClick(language) {}

  componentDidMount() {
    const options = {
      strings: words,
      typeSpeed: 60,
      backSpeed: 60,
      loop: true,
      cursorChar: "|",
    };
    // this.el refers to the <span> in the render() method
    this.typed = new Typed(this.el, options);
  }
  componentWillUnmount() {
    // Please don't forget to cleanup animation layer
    this.typed.destroy();
  }

  render() {
    return (
      <div className="Search">
        <div className="title">
          <span
            style={{ whiteSpace: "pre" }}
            ref={(el) => {
              this.el = el;
            }}
          />
          <h2>
            find the most popular repositories from the most popular programming
            languages on <a href="https://github.com/">github.com</a>
          </h2>
        </div>
        <div className="buttons">
          <Link to="/result1">
            <button style={{ background: " #ffef6b" }}>
              <p style={{ color: "black" }}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2048px-Unofficial_JavaScript_logo_2.svg.png"
                  alt="JavaScript logo"
                />
                 JavaScript
              </p>
            </button>
          </Link>
          <Link to="/result2">
            <button style={{ background: "#f4e8e8" }}>
              <p style={{ color: "#0A6EB6" }}>
                <img
                  src="https://www.blockachain.gr/wp-content/uploads/2018/03/java-coffee-cup-logo.png"
                  alt="Java logo"
                />
                 Java
              </p>
            </button>
          </Link>
          <Link to="/result3">
            <button style={{ background: "#58a6d6" }}>
              <p style={{ color: "#fbd35a" }}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png"
                  alt="Python logo"
                />
                 Python
              </p>
            </button>
          </Link>
          <Link to="/result4">
            <button style={{ background: "#e65a5d" }}>
              <p style={{ color: "#e3e6e9" }}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/1024px-Ruby_logo.svg.png"
                  alt="Ruby logo"
                />
                 Ruby
              </p>
            </button>
          </Link>
          <Link to="/result5">
            <button style={{ background: "#787CB4" }}>
              <p style={{ color: "#e3e6e9" }}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/2560px-PHP-logo.svg.png"
                  alt="PHP logo"
                />
                 PHP
              </p>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
