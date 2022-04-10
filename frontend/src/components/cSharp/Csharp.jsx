/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect}from 'react'
import Main from '../template/Main'
import logo from '../../assets/image/cSharp.png'
// import BotaoSalvar from '../botaoSalvar/BotaoSalvar'

export function BuscaGit(){
    const [repositories, setRepositories] = useState([])
        useEffect(() =>{
            fetch('https://api.github.com/users/dotnet/repos')
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
                                <a href={repository.html_url} target="_blank">Saiba Mais !</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
// eslint-disable-next-line import/no-anonymous-default-export
export default props =>
<Main icon="" title="C# .Net"
        subtitle="A linguagem C# (lê-se “cêsharp”) foi criada juntamente com a arquitetura da plataforma .NET da Microsoft.">
            <div className="display-4">
                <img className="ling" src={logo} alt="logo" />
                    C# .Net
                </div>
            <hr />
            <p className="mb-0">Repositórios do GitHub</p>
            <hr />
            <p><button type="button" class="btn btn-danger"  >Salvar Repositório</button></p>
            <BuscaGit />

    </Main>