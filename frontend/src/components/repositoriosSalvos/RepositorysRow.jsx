import React from 'react'



function RepoRow(props) {

    return(
        <tr>
            <td >
                {props.data.login}
            </td>
            <td>
            {props.data.html_url}
            </td>
            <td>
            {/* <button type = "button" class="btn btn-danger" id = {"delete" + props.data.id} onClick={props.onClick}>
                Deletar
            </button> */}
            </td>
        </tr>
    )
}

export default RepoRow