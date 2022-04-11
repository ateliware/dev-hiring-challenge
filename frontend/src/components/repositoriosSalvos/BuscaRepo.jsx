/* eslint-disable no-unused-vars */

import React, {useState, useEffect}from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import {getRepositorysTodos} from '../../services/RepositorysService'
import RepositorysRow from './RepositorysRow'
import {deleteRepositorysService} from '../../services/RepositorysService'

function Repo(){

    const [repositories, setRepositories] = useState([])

    
    useEffect(() =>{
        getRepositorysTodos()
        .then(result => {
            setRepositories(result)
        })        
        .catch(err =>{
        })
    },[])


    function onDeleteClick(event) {
        
        const id = event.target.id.replace('delete', '')
        deleteRepositorysService(id)
        .then(repository => setRepositories(repositories))
    }

    return(
        <React.Fragment>
                <div className='row'>
                    <div className='col-12'>
                        <div className='col-12 mb-4'>
                            <div className='card border-0 shadow'>
                                <div className='card-header'>
                                    <div className='row align-items-lg-center'>
                                        <div className='col'>
                                            <h2 className='fs-5 fw-bold mb-0'>
                                                Repositórios
                                            </h2>
                                        </div>
                                    </div>

                                </div>
                                <div className='table-responsive'>
                                    <div className='table align-items-center'>
                                        <thead>
                                            <tr>
                                                <th className='border-bottom' scope='col'>Nome</th>
                                                <th className='border-bottom' scope='col'>Link</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                            {repositories.map(item => <RepositorysRow key={item.id} data={item} onClick={onDeleteClick} />)}
                                            
                                        </tbody>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            
        </React.Fragment>
    )
}

export default Repo
