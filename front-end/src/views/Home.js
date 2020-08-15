import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import './../App.css';
import axios from 'axios';

function Home (props) {

    useEffect(() => {
        const fetchData = async () => {
            await axios({
                url: 'http://localhost:5000/github-api',
                method: 'get'
              })
        }
        fetchData();
        return () => { };
    }, []);

    return (
        <div className="home">
           <Link to="/repo">
               <button className="Main-button">See repositories</button>
           </Link> 
        </div>
    )
}

export default Home;