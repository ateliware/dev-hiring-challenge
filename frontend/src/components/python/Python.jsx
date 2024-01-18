/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect}from 'react'
import Main from '../template/Main'
import logo from '../../assets/image/python.png'
import BuscaGit from '../buscaGit/BuscaGit'

// eslint-disable-next-line import/no-anonymous-default-export
export default props =>

<Main icon="" title="Python"
        subtitle="Python é uma linguagem de programação de alto nível, interpretada de script, imperativa, orientada a objetos, funcional, de tipagem dinâmica e forte.">

            <div className="display-4">
                <img className="ling" src={logo} alt="logo" />
                    Python
                </div>

            <hr />
            <p className="mb-0">Repositórios do GitHub </p>
            <hr />
            <BuscaGit dados = {"https://api.github.com/users/python/repos"}/>

    </Main>