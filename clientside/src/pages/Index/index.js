import React, { Component } from "react";
import Logo from "../../assets/logo.svg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import api from "../../services/api";
import JavaScript from "../../assets/javascript.svg";
import Go from "../../assets/go.svg";
import Python from "../../assets/python.svg";
import Ruby from "../../assets/ruby.svg";
import Java from "../../assets/java.svg";
import Language from "../../components/Language";

export default class Index extends Component {

    state = {
        repositories: [],
        load: false,
        q: ''
    }

    componentDidMount() {
        this.getRepositories();
    }

    getRepositories = async () => {
        const response = await api.get("/github-repository");
        this.setState({ repositories: response.data });
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    postRepository = async (event) => {
        event.preventDefault();
        this.setState({ load: true });
        const { q } = this.state;
        await api.post("/github-repository", { q })
            .then(() => {
                this.getRepositories();
                this.setState({ load: false });
            })
            .catch(error => {
                console.log({ error });
                this.setState({ load: false });
            });
    }

    render() {
        const { repositories, load } = this.state;

        return (
            <>
                <Container>
                    <Row className="py-5">
                        <Col xs={12} className="text-center">
                            <img alt="" src={Logo} width="200" height="200" className="d-inline-block align-top" />
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col xs={12}>
                            <Form onSubmit={this.postRepository}>
                                <Row className="justify-content-center">
                                    <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                                        <Form.Control name="q" onChange={this.myChangeHandler} size="lg" placeholder="Exemplo: test" required />
                                        <Button size="lg" variant="outline-danger" type="submit" className="ml-2">buscar</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    <Language load={load} repositories={repositories.filter(item => item.language === 'JavaScript')} img={JavaScript} language={"JavaScript"} />
                    <Language load={load} repositories={repositories.filter(item => item.language === 'Go')} img={Go} language={"Go"} />
                    <Language load={load} repositories={repositories.filter(item => item.language === 'Python')} img={Python} language={"Python"} />
                    <Language load={load} repositories={repositories.filter(item => item.language === 'Ruby')} img={Ruby} language={"Ruby"} />
                    <Language load={load} repositories={repositories.filter(item => item.language === 'Java')} img={Java} language={"Java"} />
                </Container>
            </>
        );

    }
}