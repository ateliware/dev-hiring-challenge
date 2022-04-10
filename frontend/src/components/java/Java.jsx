/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect}from 'react'
import Main from '../template/Main'
import logo from '../../assets/image/java.png'
// import BotaoSalvar from '../botaoSalvar/BotaoSalvar'

export function BuscaGit(){
    const [repositories, setRepositories] = useState([])
        useEffect(() =>{
            fetch('https://api.github.com/users/openjdk/repos')
            .then(response => response.json())
            .then(data => setRepositories(data))
        }, [])
    
        return (
            <div>
                <ul>
                    { repositories.map(repository =>{
                        return(
                            <li>
                                <h3>{repository.name}</h3>
                                <p>{repository.description}</p>
                                <a href={repository.html_url} target="_blank">Saiba Mais</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
// eslint-disable-next-line import/no-anonymous-default-export
export default props =>
<Main icon="" title="Java"
        subtitle="O Java é uma linguagem de programação orientada a objetos e é uma das linguagens mais utilizadas pelas empresas na atualidade.">
            <div className="display-4">
                <img className="ling" src={logo} alt="logo" />
                    Java
                </div>
            <hr />
            <p className="mb-0">Repositórios do GitHub</p>
            <hr />
            <p><button type="button" class="btn btn-danger"  >Salvar Repositório</button></p>
            <BuscaGit />

    </Main>