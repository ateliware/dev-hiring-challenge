import React from 'react';
import { Container, Table } from 'react-bootstrap';


export class ResultTable extends React.Component {


    render(){

        return (
            <Container>
                <Table striped bordered hover>
                {/* Alterar o state visibility quando finalizar de carregar os dados da busca */}
                <thead className={this.props.visibility}>
                    <tr>
                        <th>Linguagem</th>
                        <th>Nome do Repositório</th>
                        <th>Total de Estrelas</th>
                        <th>Detalhes</th>
                    </tr>
                </thead> 
                <tbody>
                {
                /* Se o state isLoading for true e o isLoaded for false mostra a informação de 'carregando' */
                this.props.isLoading == true && this.props.isLoaded == false ?
                    <tr><td colSpan="4"><center><h2>Carregando...</h2></center></td></tr>
                : this.props.isLoaded == true &&
                /* Se o state de isLoaded for true renderiza a tabela */
                    this.props.items.map(item=><tr key={item.id}>
                        <td>{item.language}</td>
                        <td>{item.full_name}</td>
                        <td>{item.stargazers_count}</td>
                        <td><a href={item.html_url} target="_blank">Mais...</a></td>
                    </tr>) 
                    
                }
                </tbody>
                </Table>
            </Container>
        );
    }
}

