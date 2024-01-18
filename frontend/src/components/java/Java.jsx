/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect}from 'react'
import Main from '../template/Main'
import logo from '../../assets/image/java.png'
import BuscaGit from '../buscaGit/BuscaGit'

// eslint-disable-next-line import/no-anonymous-default-export
export default props =>
<Main icon="" title="Java"
        subtitle="O Java é uma linguagem de programação orientada a objetos e é uma das linguagens mais utilizadas pelas empresas na atualidade.">
            <div className="display-4">
                <img className="ling" src={logo} alt="logo" />
                    Java
                </div>
            <hr />
            <p className="mb-0">Repositórios do GitHub</p>
            <hr />
           <BuscaGit dados={"https://api.github.com/users/openjdk/repos"}/>

    </Main>