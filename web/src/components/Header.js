import React from "react";
import { Container,Navbar} from "react-bootstrap";

function Header (){
    return (
        <Navbar bg="danger" variant="dark">
            <Container>
                <Navbar.Brand>Ateliware</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Header