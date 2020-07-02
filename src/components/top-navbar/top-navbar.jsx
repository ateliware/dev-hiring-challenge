import React from 'react';
import { Navbar, Container } from 'react-bootstrap';


export class TopNavBar extends React.Component {


    render(){

        return (
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
              <img
                alt=""
                src={process.env.PUBLIC_URL + '/0.png'} 
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              DevChallenge Ateliware
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Desenvolvido por: <a href="#login">Emerson Costin</a>
              </Navbar.Text>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}

