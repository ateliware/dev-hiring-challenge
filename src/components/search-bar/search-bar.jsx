import React from 'react';
import { Button, Nav, Navbar, Container, Table } from 'react-bootstrap';
import Select from 'react-select'

export class SearchBar extends React.Component {

    constructor() {
        super();
        
        this.state={
            languages: []
        };

      }

    search = () => {
        this.props.search(this.state.languages);
    }

    render(){

    /* Opções de linguagens para buscar no GitHub */
        const options = [
            { value: 'go', label: 'Go' },
            { value: 'swift', label: 'Swift' },
            { value: 'typescript', label: 'TypeScript' },
            { value: 'rust', label: 'Rust' },
            { value: 'kotlin', label: 'Kotlin' },
            { value: 'python', label: 'Python' },
            { value: 'c', label: 'C' },
            { value: 'julia', label: 'Julia' },
            { value: 'coffescript', label: 'CoffeScript' },
            { value: 'ruby', label: 'Ruby' },
            { value: 'haskell', label: 'Haskel' }
        ]
                
        const separatorStyle = {
            height: '10px'
        }

    // Adiciona ao state quando feito alterações no componente de dropdown
       const handleChange = (e) => {
            console.log(this.state.languages)
            this.setState({
                languages: Array.isArray(e) ? e.map(x => x.value) : []   
            });
        }

        return (

            <Container>

                {/* Componente  */}
                <Select
                placeholder="Linguagens"
                options={options}
                isMulti
                name="languages" 
                onChange={handleChange}
                />

                <div style={separatorStyle}></div>

                <Button variant="secondary" size="lg" block onClick={this.search}>
                Buscar
                </Button>

                <div style={separatorStyle}></div>

            </Container>
        );
    }
}

