import React from 'react'



function RepoRow(props) {  
   
    return(
        <tr>
            <td >{props.data.id}</td>
            <td >{props.data.name}</td>
            <td>{props.data.description}</td>
            <td>{props.data.language}</td>
            <td><a href={props.data.html_url} target="_blank" rel="noopener noreferrer">Saiba mais</a></td>
            <td><button type = "button" class="btn btn-danger" id = {"delete" + props.data.id} onClick={props.onClick}>Deletar</button>
            </td>
        </tr>
    )
}

export default RepoRow