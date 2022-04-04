import React from "react";
import {Table} from "react-bootstrap";


const TableLangague = props =>{
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>
                    Nome
                </th>
                <th>
                    Linguagem
                </th>
                <th>
                    Link do Repositório
                </th>
                <th>
                    Descrição
                </th>
                <th>
                    Criador
                </th>
            </tr>
            </thead>
            <tbody>
            {props.repositoreis
                .filter(commentReply => commentReply.language ===  props.langague)
                .map((item,idx) => {
                    return <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.language}</td>
                        <td><a href={item.html_url}>{item.html_url}</a></td>
                        <td>{item.description}</td>
                        <td>{item.owner}</td>
                    </tr>

            })}
            </tbody>
        </Table>
    )

}

export default TableLangague