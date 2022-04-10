/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect}from 'react'
import Main from '../template/Main'
import logo from '../../assets/image/python.png'
// import BotaoSalvar from '../botaoSalvar/BotaoSalvar'
import CarregaDados from '../../components/botaoSalvar/CarregaDadados'

function BuscaGit(){

//const [repositories, setRepositories] = useState([])
    // useEffect(() =>{
    //     fetch('https://api.github.com/users/braziljs/repos')
    //     .then(response => response.json())
    //     .then(data => setRepositories(data))
    // }, [])

    const [vetor, setVetor] = useState([])
    
    useEffect(() =>{
        obterDados()
    })

    const obterDados  = async () =>{
        const dados = await fetch('https://api.github.com/users/braziljs/repos')
        const converter = await dados.json()
        setVetor(converter)
    }

    async function salvar(){
        const dados = await fetch('https://api.github.com/users/braziljs/repos')
        const converter = await dados.json()
        setVetor(converter.owner.login)
        console.log(`retorno da API ${JSON.stringify(setVetor)}`)
    }
        
    

    return (
        
        <div>
            <p><button type="button" class="btn btn-danger" onClick={salvar} >Salvar Repositório</button></p>
            <ul>
                { vetor.map(objeto =>{
                    return(
                        <li>
                            {objeto.owner.login}
                            {objeto.owner.html_url}
                            <h3>{objeto.name}</h3>
                            <p>{objeto.description}</p>
                            <a href={objeto.html_url} target="_blank">Saiba Mais</a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )

}



// eslint-disable-next-line import/no-anonymous-default-export
export default props =>

<Main icon="" title="Python"
        subtitle="Python é uma linguagem de programação de alto nível, interpretada de script, imperativa, orientada a objetos, funcional, de tipagem dinâmica e forte.">

            <div className="display-4">
                <img className="ling" src={logo} alt="logo" />
                    Python
                </div>

            <hr />
            <p className="mb-0">Repositórios do GitHub </p>
            <hr />
            <BuscaGit />

    </Main>