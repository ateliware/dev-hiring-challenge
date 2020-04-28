import React, {useEffect} from 'react';

import { listAll, deleteRepos } from '../../actions/repoAction';
import { idleLoading } from '../../actions/searchAction';

import { fetchRepos, deleteAllRepos } from '../../services/repoService';

import Table from 'react-bootstrap/Table';
import ItemRepo from '../../components/item-repo';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';

const ListRepos = (rest) => {

  const repos = useSelector(state => state.repo);
  const dispatch = useDispatch();
  
  useEffect(() => {
      if(repos.length === 0){
        fetchRepos().then(resp => {
          dispatch(listAll(resp));
        });
      }
      dispatch(idleLoading());
      
    
  },[]);

  const resetTable = () => {
    deleteAllRepos();
    dispatch(deleteRepos());
    dispatch(idleLoading());
  }

  return (
    <div {...rest}>
      <Row>
        <Col>
          <h2>Repository List</h2>
        </Col>
        {repos.length > 0 && (
          <Col className="text-right">
            <Button 
              onClick={() => resetTable()}
              className="mt-3" 
              variant="secondary"
              size="sm" >
              Reset Table
            </Button>
          </Col>
        )}
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Language</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {repos.length === 0 && (<tr><td colSpan="3"><em>No repositories added</em></td></tr>)}
              {repos.map(repo => (
                <ItemRepo repo={repo} key={repo.id} />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      
    </div>
  )
}
export default ListRepos;