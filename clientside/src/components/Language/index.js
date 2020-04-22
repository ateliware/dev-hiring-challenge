import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";

export default class Language extends Component {

    render() {
        const { repositories = [], load = false } = this.props;

        return (
            <>
                <Row className="mt-5">
                    <Col xs={12} className="d-flex align-items-center">
                        <Image src={this.props.img} width={50} />
                        <h3 className="mb-0 ml-3">{this.props.language}</h3>
                    </Col>
                </Row>
                <Row className="mt-4 mb-3">
                    <Col xs={12}>
                        {(repositories.length !== 0 && load === false) ?
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Busca</th>
                                        <th>Repositório</th>
                                        <th>Descrição</th>
                                        <th>Url</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {repositories.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.search}</td>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td>{item.html_url}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            :
                            <>
                                {(load === false) ?
                                    <p className="text-muted text-center">Nenhum repositório encontrado</p>
                                    : <div className="text-center"> <Spinner animation="border" variant="danger" /></div>}
                            </>
                        }
                    </Col>
                </Row>
            </>
        );

    }
}