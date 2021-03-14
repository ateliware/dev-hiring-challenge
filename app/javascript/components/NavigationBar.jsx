import React from "react"

import { Navbar } from "react-bootstrap";

/**
 * NavigationBar component
 * 
 * Parents:
 *  - root (layouts/application.html.erb)
 */
class NavigationBar extends React.Component {
  render () {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          dev-hiring-challenge
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default NavigationBar
