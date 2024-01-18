/* eslint-disable import/no-anonymous-default-export */

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/home/Home"
import JavaScript from "../components/javascript/Javascript"
import Node from "../components/node/Node"
import Csharp from "../components/cSharp/Csharp"
import Java from "../components/java/Java"
import Python from "../components/python/Python"
import Endrigo from "../components/endrigo/Endrigo"
import RepositoriosSalvos from "../components/repositoriosSalvos/RepositoriosSalvos"

export default props =>
<Routes>
  
<Route exact path="/" element={<Home />} />
  <Route exact path="/home3" element={<Home />} />
  <Route path="/javascript" element={<JavaScript />} />
  <Route path="/node" element={<Node />} />
  <Route path="/csharp" element={<Csharp />} />
  <Route path="/java" element={<Java />} />
  <Route path="/python" element={<Python />} />
  <Route path="/endrigo" element={<Endrigo />} />
  <Route path="/respositoriosSalvos" element={<RepositoriosSalvos />} />
</Routes>