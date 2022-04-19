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
        .then(result =>{
            setRepositories(result)
        })
    })

    const [cor, setCor] = useState('blue')
    //função para alterar a cor
    const alteraCor = () =>{
        setCor( cor === 'blue' ? 'gray': 'blue')
    }

    function onDeleteClick(event) {
        
        const id = event.target.id.replace('delete', '')
        deleteRepositorysService(id)
        let copiaVetor = [...repositories]
        copiaVetor.splice(id,1)
        setRepositories(copiaVetor)
        ComponenteListarRepositorios(copiaVetor)
        
    }
    
    function ComponenteListarRepositorios(copiaVetor){

        useEffect(() =>{
                setRepositories(copiaVetor)
            })
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
                                                <th className='border-bottom' scope='col'>#</th>
                                                <th className='border-bottom' scope='col'>Nome do Repositório</th>
                                                <th className='border-bottom' scope='col'>Descrição</th>
                                                <th className='border-bottom' scope='col'>Linguagem</th>
                                                <th className='border-bottom' scope='col'>Link</th>
                                                <th className='border-bottom' scope='col'>Ação</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                    </tr>
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