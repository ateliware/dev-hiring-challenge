/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect}from 'react'
import Main from '../template/Main'
import logo from '../../assets/image/node.png'
// import BotaoSalvar from '../botaoSalvar/BotaoSalvar'


export function BuscaGit(){
    const [repositories, setRepositories] = useState([])
        useEffect(() =>{
            fetch('https://api.github.com/users/nodejs/repos')
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
<Main icon="" title="Node Js"
        subtitle="O Node Js se caracteriza como um ambiente de execução JavaScript. Com ele, o usuário pode criar aplicações sem depender do browser para isso.">
            <div className="display-4">
                <img className="ling" src={logo} alt="logo" />
                    Node Js
                </div>
            <hr />
            <p className="mb-0">Repositórios do GitHub</p>
            <p><button type="button" class="btn btn-danger"  >Salvar Repositório</button></p>
            <BuscaGit />

    </Main>