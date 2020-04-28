import React from 'react';
import { useToasts } from 'react-toast-notifications'

import { useSelector, useDispatch } from 'react-redux';
import { fetchRepos } from '../../services/githubService';
import { saveRepos } from '../../services/repoService';
import { 
  IDLE, 
  START_LOADING,
  startLoading,
  endLoading,
  idleLoading
} from '../../actions/searchAction';

import {
  postRepos
} from '../../actions/repoAction'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert  from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const AddRepos = () => {

  const loading = useSelector(state => state.loadingReducer.loading);
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const addRepos = async () => {
    dispatch(startLoading());
    let repos = [];
    
    try{
      const gitRepos = await fetchRepos();
      repos = await saveRepos(gitRepos);
      dispatch(endLoading());
      dispatch(postRepos(repos));
    }catch(e){
      const errorMessage = `ERROR: Too many requests. Please try again in a few minutes.`;
      addToast(errorMessage, { appearance: 'error', autoDismiss: true })
      dispatch(idleLoading());
    }
    
  }

  return (
    <>
      <Row>
        <Col>
          <Button 
            disabled={loading === START_LOADING}
            onClick={() => addRepos()}
            className="mt-3" 
            variant="primary" >
            Add 5 random repositories from GitHub
          </Button>
        </Col>
        <Col>
          {
            loading !== IDLE ? (
              loading === START_LOADING ? 
              (
                <Alert variant='warning'>
                  Loading repositories, please wait...
                </Alert>
              ):(
                <Alert variant='success'>
                  Load complete!
                </Alert>
              )
            ) : ""
          }
        </Col>
      </Row>  
    </>
  )
}

export default AddRepos;