import React, { Component } from 'react';
import Navbar from './Navbar';
import Itens from './Itens';
import BottomBar from './BottomBar';
import axios from 'axios';

class Favorites extends Component {
    constructor(props) {
        super(props);

        this.state = {
            repositories: []
        }

    }

    componentDidMount() {
        axios.get("/api/v1/repositories", { withCredentials: true })
        .then(response => {
            this.setState({
              repositories: response.data
            })
        }).catch(error => {
          console.log("check login error", error);
        })        
    }

    render() { 
        return (
            <div>
                <Navbar/>
                <Itens itens={this.state.repositories} />
                <BottomBar/>
            </div>
          );
    }
}
 
export default Favorites;