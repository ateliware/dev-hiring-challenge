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
            <button style={{ border: "0.3rem solid #F7DF1E" }}>
              <p style={{ color: "black" }}>JavaScript</p>
            </button>
          </Link>
          <Link to="/result2">
            <button style={{ border: "0.3rem solid #f4e8e8" }}>
              <p style={{ color: "#0A6EB6" }}>Java</p>
            </button>
          </Link>
          <Link to="/result3">
            <button style={{ border: "0.3rem solid #2a7eb2" }}>
              <p style={{ color: "#fbd35a" }}>Python</p>
            </button>
          </Link>
          <Link to="/result4">
            <button style={{ border: "0.3rem solid #EF0E13" }}>
              <p style={{ color: "#e3e6e9" }}>Ruby</p>
            </button>
          </Link>
          <Link to="/result5">
            <button style={{ border: "0.3rem solid #787CB4" }}>
              <p style={{ color: "#e3e6e9" }}>PHP</p>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
