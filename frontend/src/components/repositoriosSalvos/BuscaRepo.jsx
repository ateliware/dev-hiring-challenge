/* eslint-disable no-unused-vars */

import React, {useState, useEffect}from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import {getRepositorysTodos} from '../../services/RepositorysService'
import RepositorysRow from './RepositorysRow'
import {deleteRepositorysService} from '../../services/RepositorysService'

function Repo(){

    const [repositories, setRepositories] = useState([])

    //AULAS DE HOOKS

    const [nota1, setNota1] = useState(0)
    const [nota2, setNota2] = useState(0)

    let media = (nota1 + nota2) / 2
    let situacao = media >= 7 ? 'Aprovado': 'Reprovado'

    const [repo, setRepo] = useState('endrigo valente')

    const [nome, setNome] = useState('')

    const [idade, setIdade] = useState(0)

    const evento = (e) => {
        setRepo(e.target.value)
    }
//MODELO JSON
    const modelo = {nome:'', email:'', cidade:''}

// useState
    const[formulario, setFormulario] = useState(modelo)

// EVENTO
    const novoEvento = (e) =>{
        let nome = e.target.name;
        let valor = e.target.value

        setFormulario({...formulario, [nome]:valor})
    }


    // aulas de hook

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
                                            {/* aulas de hooks */}
                                            
                                            <input type="text" name="nome" placeholder="nome" onChange={novoEvento} />
                                            <input type="text" name="email"  placeholder="email" onChange={novoEvento} />
                                            <input type="text" name="cidade" placeholder="cidade" onChange={novoEvento} />

                                            <p>{formulario.nome}</p>
                                            <p>{formulario.email}</p>
                                            <p>{formulario.cidade}</p>
                                            {/* <p>{JSON.stringfy(formulario)}</p> */}

                                            <hr />
                                            <input type="number" placeholder="nota 1" onChange={e => setNota1(parseFloat(e.target.value))} />
                                            <input type="number" placeholder="nota 2" onChange={e => setNota2(parseFloat(e.target.value))} />
                                            {nota1 && nota2 ? <h1>{situacao} com média: {media}</h1>: ''}
                                            <hr />
                                            <input type="text" placeholder="Nome" onChange={e => setNome(e.target.value)} />
                                            <input type="number" placeholder="Idade" onChange={e => setIdade(e.target.value)} />
                                            <p>{nome}</p>
                                            <p>{idade}</p>

                                            <hr/>
                                            <input type="text" onChange={evento} />
                                            <p> teste : {repo}</p>

                                            {/* aulas de hooks */}
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