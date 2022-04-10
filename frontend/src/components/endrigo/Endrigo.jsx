/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect}from 'react'
import Main from '../template/Main'
import logo from '../../assets/image/endrigo.png'
// import BotaoSalvar from '../botaoSalvar/BotaoSalvar'

export function BuscaGit(){
    const [repositories, setRepositories] = useState([])
        useEffect(() =>{
            fetch('https://api.github.com/users/evalente82/repos')
            .then(response => response.json())
            .then(data => setRepositories(data))
        }, [])
    
        return (
            <div>
                <ol>
                    { repositories.map(repository =>{
                        return(
                            <li>
                                <h3>{repository.name}</h3>
                                <p>{repository.description}</p>
                                <a href={repository.html_url} target="_blank">Saiba Mais</a>
                            </li>
                        )
                    })}
                </ol>
            </div>
        )
    }
// eslint-disable-next-line import/no-anonymous-default-export
export default props =>
<Main icon="" title="Endrigo Valente"
        subtitle="portfólio dinâmico.">
            <div className="display-4">
                <img className="ling" src={logo} alt="logo" />
                    Endrigo Moura Valente
                </div>
            <hr />
            <p className="mb-0">Repositórios do GitHub</p>
            <hr />
            <p><button type="button" class="btn btn-danger"  >Salvar Repositório</button></p>
            <BuscaGit />

    </Main>