
import './App.css';
import 'axios';
import React,{useEffect, useState} from "react";
import axios from "axios";
import {Button, Col, Container, Row, Table,Nav} from "react-bootstrap";
import Header from "./components/Header";


function App() {
    /*const [repositoreis,setRepositories] = useState([])

    useEffect(() =>{
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8080/repositories")
            setRepositories(response.data.data)
        }
        fetchData()
    },[])*/

  return (
      <Container>
          <Row>
              <Header/>
          </Row>
          <Row>
              <Col>
                  <p></p>
              </Col>
              <Col>
                  <Button size="sm" variant="primary"> Carregar </Button>
              </Col>
          </Row>
          <Row>
              <Nav fill variant="tabs" >
                  <Nav.Item>
                      <Nav.Link>Go</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link>Python</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link>Javascript</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link>C#</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link>
                          C++
                      </Nav.Link>
                  </Nav.Item>
              </Nav>
          </Row>
      </Container>
  );
}

export default App;
