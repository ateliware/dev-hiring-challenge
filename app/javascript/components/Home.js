import React, { Component } from 'react';
import Navbar from './Navbar';
import BottomBar from './BottomBar';
import Form from './Form';

class Home extends Component {
    render() { 
        return (
            <div>
                <Navbar/>
                <Form />
                <BottomBar/>
            </div>
          );
    }
}
 
export default Home;