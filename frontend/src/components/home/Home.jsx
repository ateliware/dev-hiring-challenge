/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import React from "react";
import Main from '../template/Main'
import logo from '../../assets/image/ateliware.svg'




export default props =>
<Main title="As 5 principais linguagens da minha escolha !"
        subtitle="JavaScript, Node Js, C# .Net, Java, e Python.">
            <div className="display-4">
                <img className="ling" src={logo} alt="logo" />
                    Por Endrigo Valente
                </div>
            <hr />
            <p className="mb-0">Sei que existem diversas linguagens, que alguns podem considerar
            um absurdo não estar na minha lista, sim eu sei !
            </p>
            É só a minha visão, e bem estreita deste gigantesco mercado, se é que podemos chamar de
            mercado das linguagens, pois como sabemos 
            <p>todas as linguagens atendem no que se refere a criação
            de Software.
            <p>Umas tem propostas e ferramentas melhores para algum serviço do que outras,
            mas não podemos negar que os profissionais
            <p>que dominam mais de 2 ou 3 linguagens conseguem se destacar ao se candidatar para as referidas vagas</p> 
            </p></p>
            

    </Main>

