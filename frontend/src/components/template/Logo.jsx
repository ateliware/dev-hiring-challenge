import './Logo.css'
import React from 'react'
import logo from '../../assets/image/ateliware.svg'
import { Link } from 'react-router-dom'

// eslint-disable-next-line import/no-anonymous-default-export
export default props =>
<aside className="logo">
        <Link to="/home3" className="logo">
            <img src={logo} alt="logo" />
        </Link>
    </aside>