/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect}from 'react'
import Main from '../template/Main'
import logo from '../../assets/image/git.png'
import BuscaRepo from './BuscaRepo'
import deleteRepositorysService from '../../services/RepositorysService'


// eslint-disable-next-line import/no-anonymous-default-export
export default props =>
<Main icon="" title="Repositórios Salvos"
        subtitle="Lista de repositórios salvos.">
            
            <div className="display-4">
                <img className="ling" src={logo} alt="logo" />
                Repositórios Salvos
                </div>
            <hr />
            <p className="mb-0">Repositórios salvos do GitHub</p>
            <hr />
            <BuscaRepo />

    </Main>