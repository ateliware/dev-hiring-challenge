
import './App.css';
import 'axios';
import React,{useEffect, useState} from "react";
import axios from "axios";
import "react-bootstrap"
import {Col, Container, Row, Table} from "react-bootstrap";
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
              <Col>1 of 2</Col>
              <Header/>
          </Row>
          <Row>
              <Table striped bordered>
                  <thead>
                  <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td>1</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                  </tr>
                  <tr>
                      <td>2</td>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                  </tr>
                  <tr>
                      <td>3</td>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                  </tr>
                  </tbody>
              </Table>
          </Row>
      </Container>
  );
}

export default App;
