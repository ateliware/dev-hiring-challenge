import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AddRepos from '../../components/add-repos';
import ListRepos  from '../../components/list-repos';

const Home = () => {

  return(
    <>
      <Row>
        <Col>
          <h1 className="mt-5" >Fetch repositories from GitHub</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <AddRepos />
        </Col>
      </Row>

      <Row>
        <Col>
            <ListRepos className="mt-5" />
        </Col>
      </Row>

    </>
  )

}

export default Home;