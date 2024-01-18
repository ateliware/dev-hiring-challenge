/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect}from 'react'
import Main from '../template/Main'
import logo from '../../assets/image/endrigo.png'
import BuscaGit from '../buscaGit/BuscaGit'

// eslint-disable-next-line import/no-anonymous-default-export
export default props =>
<Main icon="" title="Endrigo Valente"
        subtitle="portfólio dinâmico.">
            <div className="display-4">
                <img className="ling" src={logo} alt="logo" />
                    Endrigo Moura Valente
                </div>
            <hr />
            <p className="mb-0">Repositórios do GitHub</p>
            <hr />
            <BuscaGit dados={"https://api.github.com/users/evalente82/repos"}/>

    </Main>