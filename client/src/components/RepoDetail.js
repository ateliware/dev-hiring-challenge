import React, { Fragment, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';

import { formatDate } from '../utils/utils'

const RepoDetail = ({ repo }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Fragment>
            <Button variant="primary" onClick={handleShow}>Details</Button>

            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>{repo.r_language} Repository Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs lg="2">
                            <img
                                src={repo.r_owner_avatar_url}
                                className='img-fluid rounded'
                                alt=''
                            />
                        </Col>
                        <Col>
                            <h1>{repo.r_name}</h1>
                            <h5>{repo.r_owner_login}</h5>
                            <p>{repo.r_description}</p>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            <p><b>Updated at:</b> {formatDate(repo.r_updated_at)}</p>
                            <p><b>Stars:</b> {repo.r_stargazers_count}</p>
                            <p><b>Watchers:</b> {repo.r_watchers_count}</p>
                        </Col>
                        <Col>
                            <p><b>Size:</b> {repo.r_size} kB</p>
                            <p><b>Forks:</b> {repo.r_forks_count}</p>
                            <p><b>Open Issues:</b> {repo.r_open_issues_count}</p>
                        </Col>
                    </Row>
                    <hr />
                    <p>The repository on GitHub can be accessed <a href={repo.r_html_url} target="_blank" rel="noreferrer">here</a>.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default RepoDetail;