import React, {useState, useEffect} from 'react';

import { fetchRepos } from '../../services/githubService';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';



const Home = () => {

  const [repos, setRepos] = useState([]);

  const addRepos = async () => {

    const repos = await fetchRepos();
    console.log("fetched repos", repos);
    
    setRepos(repos);
  }

  useEffect(() => {
    
    
  }, []);


  return(
    <>
      <Row>
        <Col>
          <h1>Repos</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button 
            onClick={() => addRepos()}
            className="mt-3" 
            variant="primary" >
            Add 5 random repositories from GitHub
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2 className="mt-5">Repo List</h2>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Language</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {repos.length === 0 && (<tr><td colSpan="4">You have added any repository yet.</td></tr>)}
              {repos.filter(repo => repo !== undefined).map(repo => (
                <tr key={repo.id} >
                  <td>{repo.full_name}</td>
                  <td>{repo.language}</td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
              
            </tbody>
          </Table>
        </Col>
      </Row>

    </>
  )

}

export default Home;