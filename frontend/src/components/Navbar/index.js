import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import * as Reactstrap from 'reactstrap';

import Styles from './styles';

function Navbar() {
  const match = useRouteMatch();
  const [opened, setOpened] = useState(false);

  return (
    <Styles.Container>
      <Reactstrap.Navbar color="dark" dark expand="md">
        <div className="container-fluid">
          <Styles.CustomLink to="/" className="navbar-brand">
            <span>repo</span>
            <span className="text-warning">view</span>
          </Styles.CustomLink>
          <Reactstrap.NavbarToggler
            onClick={() => setOpened(!opened)}
          />
          <Reactstrap.Collapse isOpen={opened} navbar>
            <Reactstrap.Nav className="mr-auto" navbar>
              <Reactstrap.NavItem>
                <Styles.CustomLink
                  to="/"
                  className="nav-link"
                  selected={match.path === '/'}
                >
                  Meus repositórios
                </Styles.CustomLink>
              </Reactstrap.NavItem>
              <Reactstrap.NavItem>
                <Styles.CustomLink
                  to="/repo-results"
                  className="nav-link"
                  selected={match.path === '/repo-results'}
                >
                  Buscar repositórios
                </Styles.CustomLink>
              </Reactstrap.NavItem>
            </Reactstrap.Nav>
          </Reactstrap.Collapse>
        </div>
      </Reactstrap.Navbar>
    </Styles.Container>
  );
}

export default Navbar;
