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
            </tr>
            </thead>
            <tbody>
            {props.repositoreis.map((item,idx) => {
                if(item.language === props.langague) {
                    return <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.language}</td>
                        <td>{item.html_url}</td>
                    </tr>
                }
            })}
            </tbody>
        </Table>
    )

}

export default TableLangague