/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect}from 'react'
import Main from '../template/Main'
import logo from '../../assets/image/JavaScript.png'
import BuscaGit from '../buscaGit/BuscaGit'

// eslint-disable-next-line import/no-anonymous-default-export
export default props =>
<Main icon="" title="JavaScript"
        subtitle="JavaScript é uma linguagem de script orientada a objetos, multiplataforma.">
            <div className="display-4">
                <img className="ling" src={logo} alt="logo" />
                    JavaScript
                </div>
            <hr />
            <p className="mb-0">Repositórios do GitHub</p>
            <hr />
            <BuscaGit dados={"https://api.github.com/users/braziljs/repos"} />

    </Main>