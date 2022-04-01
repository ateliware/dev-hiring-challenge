
import './App.css';
import 'axios';
import React,{useEffect, useState} from "react";
import axios from "axios";
import {Button, Col, Container, Row, Table, Nav, Tab, Tabs, TabContent} from "react-bootstrap";
import Header from "./components/Header";
import TableLangague from "./components/TableLangague";


function App() {
    const [repositoreis,setRepositories] = useState([])

    useEffect(() =>{
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8080/repositories?language=Go")
            setRepositories(response.data.data)
        }
        fetchData()
    },[])

  return (
      <Container fluid='md'>
          <Row>
              <Header/>
          </Row>
          <Row className="justify-content-center">
              <Col md={6} className="text-center text-md-right" style={{margin:"1rem"}}>
                  <p>Clique em "Carregar" para trazer todas listas do repositórios mais amados </p>
              </Col>
              <Col md={6} className="text-center text-md-left" >
                  <Button variant="primary"> Carregar </Button>
              </Col>
          </Row>
          <Row>
              <Col>
                  <Button size="sm" variant="primary"> Carregar </Button>
              </Col>
          </Row>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
              <Nav justify variant="tabs" defaultActiveKey="/home">
                  <Nav.Item>
                      <Nav.Link eventKey="go">Go</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey="python">Python</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey="javascript">Javascript</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey="c#">C#</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey="c">C</Nav.Link>
                  </Nav.Item>
              </Nav>
          </Row>
              <Row>
                  <Tab.Content>
                      <Tab.Pane eventKey="go">
                         <TableLangague langague={"Go"} repositoreis={repositoreis}/>
                      </Tab.Pane>
                      <Tab.Pane eventKey="python">
                          <TableLangague langague={"Python"} repositoreis={repositoreis}/>
                      </Tab.Pane>
                      <Tab.Pane eventKey="javascript">
                          <TableLangague langague={"JavaScript"} repositoreis={repositoreis}/>
                      </Tab.Pane>
                      <Tab.Pane  eventKey="c#">
                          <TableLangague langague={"C#"} repositoreis={repositoreis}/>
                      </Tab.Pane>
                      <Tab.Pane eventKey="c">
                          <TableLangague langague={"C"} repositoreis={repositoreis}/>
                      </Tab.Pane>
                  </Tab.Content>
              </Row>
        </Tab.Container>
      </Container>
  );
}

export default App;
