import React, { useState, useEffect } from 'react';
import './../App.css';
import axios from 'axios';

function Repo (props) {

    const [reposi, setReposi] = useState();
    const items = [];
    var classe, lang;

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios({
                url: 'http://localhost:5000/repo?',
                method: 'get'
              })
            setReposi(pre => ({...pre, reposi: data}));
        }
        fetchData();
        return () => { };
    }, []);


    for (var ft=0; ft<5; ft++) { 
        for (var i=0; i<3; i++){
            for(var key in reposi) {
                switch (ft) {
                    case 0:
                        classe = reposi[key].rowSwifts[i];
                        lang = 'Swift';
                        break;
                    case 1:
                        classe = reposi[key].rowJavascripts[i];
                        lang = 'JavaScript';
                        break;
                    case 2:
                        classe = reposi[key].rowRubies[i];
                        lang = 'Ruby';
                        break;
                    case 3:
                        classe = reposi[key].rowPhps[i];
                        lang = 'PHP';
                        break;
                    case 4:
                        classe = reposi[key].rowPythons[i];
                        lang = 'Python';
                        break;
                    default:
                        console.log("Different language");
                }

                items.push(
                <div className="cards">
                    <a href={classe.url} target="_blank" rel="noopener noreferrer">{classe.repo}</a>
                    <p><b>Programming language: </b>{lang}</p>
                    <p><b>Owner: </b>{classe.owner}</p>
                    <p><b>Stars: </b>{classe.stars}</p>
                </div>        
                )
            }
        }
    }

    return (
        <>
            <div className="repoPage">
                <h1 className="repoTitle">We've found 15 relevant repositories</h1>
                <div className="grids">{items}</div>
            </div>
        </>
    )
}

export default Repo;