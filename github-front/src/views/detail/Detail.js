import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default () => {

  const [repo, setRepo] = useState({});
  const repos = useSelector(state => state.repo);
  const { id } = useParams();

  useEffect(() => {
    const repoFound = repos.find(repo => repo.id === parseInt(id));
    setRepo(repoFound);
  }, [repos, id]);

  
  return (
    <>
      <div className="mt-4">
        <Row>
          <Col>
            <Link to="/"> Back to List </Link>
          </Col>
        </Row>

        <Row>
          <Col>
            <h2 className="mt-5">{repo.name}</h2>
            <Card>
              <Card.Body>
                <p>
                  <span className="font-weight-bold">Language: </span>
                  <span>{repo.language}</span>
                </p>
                <p>
                  <span className="font-weight-bold">Description: </span>
                  <span>{repo.description}</span>
                </p>
                <p>
                  <span className="font-weight-bold">More information: </span>
                  <a target="_blank" rel="noopener noreferrer" href={repo.url}>See on GitHub</a>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}