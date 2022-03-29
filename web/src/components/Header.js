import React from "react";
import {Col, Container, Row, Table, Navbar, Nav} from "react-bootstrap";

function Header (){
    return (
        <Navbar bg="danger" variant="dark">
            <Container>
                <Navbar.Brand>Navbar</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Header