import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

// eslint-disable-next-line import/no-anonymous-default-export
export default props =>
    <aside className="menu-area">
        <nav className="menu">
            {/* <Link to="/">
                <i className='home'></i> Início                
            </Link> */}
            
            <Link to="/home3">
                <i className='home3'></i> Home              
            </Link>

            <Link to="/javascript">
                <i className='javascript'></i> JavaScript
            </Link>

            <Link to="/node">
                <i className='node'></i> Node Js
            </Link>

            <Link to="/cSharp">
                <i className='cSharp'></i> C# .Net
            </Link>

            <Link to="/java">
                <i className='java'></i> Java
            </Link>

            <Link to="/python">
                <i className='python'></i> Python
            </Link>

            <Link to="/endrigo">
                <i className='endrigo'></i> Endrigo Valente
            </Link>

            <Link to="/respositoriosSalvos">
                <i className='respositoriosSalvos'></i> Respositórios Salvos
            </Link>
        </nav>
    </aside>