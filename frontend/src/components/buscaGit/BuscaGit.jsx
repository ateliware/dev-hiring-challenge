/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import BuscaGit1 from '../buscaGit/BuscaGit1.css'
import React, {useState, useEffect }from 'react'
import { salvarRepositorysService } from '../../services/RepositorysService'



function BuscaGit({dados, batata}){

    const linkUrl = dados
    const [vetor, setVetor] = useState([])
    const [termo, setTermo] = useState('')
    
    const obterDados  = async () =>{
        const dados = await fetch(linkUrl)
        const converter = await dados.json()
        setVetor(converter)
    }

    useEffect(() =>{
        obterDados()
    })

    const Salvar = (indice, name, description, language, html_url) =>{ 
        salvarRepositorysService(name, description, language, html_url)
      }

    return (
        
        <div>
            <input type='text' onChange={e=>setTermo(e.target.value)} placeholder='Informe o Repositório para busca-lo' className='form-control pesquisa' />
            <table>
                <thead>
                    <tr>
                        <th >#</th>
                        <th>Nome do Repositório</th>
                        <th>Descrição</th>
                        <th>Linguagem</th>
                        
                    </tr>
                </thead>
                    <tbody>
                        {
                            vetor.filter(objeto => objeto.name.includes(termo)).map((objeto, indice) =>{
                                return(
                                    <tr key={indice}>
                                        <td >{indice + 1}</td>
                                        <td>{objeto.name}</td>
                                        <td>{objeto.description}</td>
                                        <td>{objeto.language}</td>
                                        <td>{<button type="button" onClick={() => Salvar(indice, objeto.name, objeto.description, objeto.language, objeto.html_url)} class="btn btn-danger"  >Salvar Repositório</button>}</td>
                                        <td><a href={objeto.html_url} target="_blank">Saiba Mais</a></td>
                                    </tr>
                                )
                            })
                        }                        
                    </tbody>                
            </table>
        </div>
    )
}
export default BuscaGit