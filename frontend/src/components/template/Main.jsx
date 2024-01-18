import './Main.css'
import Header from './Header'
import React from 'react'

// eslint-disable-next-line import/no-anonymous-default-export
export default props =>
    <React.Fragment>
        <Header {...props} />
        <main className="content conteiner-fluid">
            <div className="p-3 m-3">
                {props.children}
            </div>        
        </main>
    </React.Fragment>