
import React, { useEffect, useState } from 'react';
import {salvarRepositorysService} from '../../services/RepositorysService'


export default function BotaoSalvar(props) {
    const [vetor, setVetor] = useState([])
    
    useEffect(() =>{
        obterDados()
    })

    const obterDados  = async () =>{
        const dados = await fetch('https://api.github.com/users/braziljs/repos')
        const converter = await dados.json()
        setVetor(converter)
    }


    return(
        <React.Fragment>
            <ul>
                {vetor.map(objeto =>(<li>{objeto.name}</li>))}
            </ul>
            <p><button type="button" class="btn btn-danger"  >Salvar Repositório</button></p>
        </React.Fragment>
    )
    
}