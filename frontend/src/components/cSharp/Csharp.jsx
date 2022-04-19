/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect}from 'react'
import Main from '../template/Main'
import logo from '../../assets/image/cSharp.png'
import BuscaGit from '../buscaGit/BuscaGit'

// eslint-disable-next-line import/no-anonymous-default-export
export default props =>
<Main icon="" title="C# .Net"
        subtitle="A linguagem C# (lê-se “cêsharp”) foi criada juntamente com a arquitetura da plataforma .NET da Microsoft.">
            <div className="display-4">
                <img className="ling" src={logo} alt="logo" />
                    C# .Net
                </div>
            <hr />
            <p className="mb-0">Repositórios do GitHub</p>
            <hr />
            <BuscaGit dados={"https://api.github.com/users/dotnet/repos"}/>

    </Main>