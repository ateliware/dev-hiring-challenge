import './App.css';
import 'axios';
import React, {useState} from "react";
import axios from "axios";
import {Button, Col, Container, Row, Nav, Tab} from "react-bootstrap";
import Header from "./components/Header";
import TableLangague from "./components/TableLangague";
import Footer from "./components/Footer";


function App() {
    const [repositoreis, setRepositories] = useState([])
    const [loading,setLoading] = useState(false)

    const handleCarregar = () => {
        setLoading(true)
        const fetchData = async () => {
            await axios.post("http://localhost:8080/repositories")
            const response = await axios.get("http://localhost:8080/repositories")
            setRepositories(response.data.data)
            setLoading(false)
        }
        fetchData()
    }


    return (
        <Container>
            <Row>
                <Header style={{
                    position: "fixed",
                    color: "dark"
                }}/>
            </Row>
            <Row className="justify-content-center">
                <Col md={6} className="text-center text-md-right" style={{margin: "1rem"}}>
                    <p>Clique em "Carregar" para trazer todas listas do repositórios mais amados </p>
                </Col>
                <Col md={6} className="text-center text-md-left" style={{margin: "1rem"}}>
                    <Button variant="primary" onClick={(e) => handleCarregar()}> { loading ? "...": "Carregar"}</Button>
                </Col>
            </Row>
            <Tab.Container id="left-tabs-example" defaultActiveKey="go">
                <Row>
                    <Nav justify variant="tabs" defaultActiveKey="go">
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
                {repositoreis.length ?  <Row>
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
                        <Tab.Pane eventKey="c#">
                            <TableLangague langague={"C#"} repositoreis={repositoreis}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="c">
                            <TableLangague langague={"C"} repositoreis={repositoreis}/>
                        </Tab.Pane>
                    </Tab.Content>
                </Row>: null }
            </Tab.Container>
            <Row style={{margin: "1rem"}}>
                <Footer/>
            </Row>
        </Container>
    );
}

export default App;
