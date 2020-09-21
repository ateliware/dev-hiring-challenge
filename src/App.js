import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Repo from './Repo';

class App extends Component {
  constructor() {
    super();
    this.state = {
      reposDart: [],
      reposKot: [],
      reposJs: [],
      reposRuby: [],
      reposSwift: []
    };
    this.getRepo = this.getRepo.bind(this);
    this.armazenaRepos = this.armazenaRepos.bind(this);
  }

  getRepo() {
    axios.get('https://api.github.com/search/repositories?q=language:dart&per_page=3')
      .then(({ data }) => this.setState({ reposDart: data }));
    axios.get('https://api.github.com/search/repositories?q=language:kotlin&per_page=3')
      .then(({ data }) => this.setState({ reposKot: data }));
    axios.get('https://api.github.com/search/repositories?q=language:javascript&per_page=3')
      .then(({ data }) => this.setState({ reposJs: data }));
    axios.get('https://api.github.com/search/repositories?q=language:ruby&per_page=3')
      .then(({ data }) => this.setState({ reposRuby: data }));
    axios.get('https://api.github.com/search/repositories?q=language:swift&per_page=3')
      .then(({ data }) => this.setState({ reposSwift: data }));
  }

  renderReposDart = () => {
    const { reposDart } = this.state;
    return (
      <div className='row'>
        <div className='col-md-12'>
          {reposDart.items.map(repo => <Repo key={repo.name} repo={repo} />)}
        </div>
      </div>
    )
  }

  renderReposKotlin = () => {
    const { reposKot } = this.state;
    return (
      <div className='row'>
        <div className='col-md-12'>
          {reposKot.items.map(repo => <Repo key={repo.name} repo={repo} />)}
        </div>
      </div>
    )
  }

  renderReposJs = () => {
    const { reposJs } = this.state;
    return (
      <div className='row'>
        <div className='col-md-12'>
          {reposJs.items.map(repo => <Repo key={repo.name} repo={repo} />)}
        </div>
      </div>
    )
  }

  renderReposRuby = () => {
    const { reposRuby } = this.state;
    return (
      <div className='row'>
        <div className='col-md-12'>
          {reposRuby.items.map(repo => <Repo key={repo.name} repo={repo} />)}
        </div>
      </div>
    )
  }

  renderReposSwift = () => {
    const { reposSwift } = this.state;
    return (
      <div className='row'>
        <div className='col-md-12'>
          {reposSwift.items.map(repo => <Repo key={repo.name} repo={repo} />)}
        </div>
      </div>
    )
  }

  armazenaRepos() {
    const { reposDart, reposKot, reposJs, reposRuby, reposSwift } = this.state;
    const listaDart = reposDart.items.map(repo => repo.name);
    const listaKot = reposKot.items.map(repo => repo.name);
    const listaJs = reposJs.items.map(repo => repo.name);
    const listaRuby = reposRuby.items.map(repo => repo.name);
    const listaSwift = reposSwift.items.map(repo => repo.name);
    const resultDart = [];
    const resultKot = [];
    const resultJs = [];
    const resultRuby = [];
    const resultSwift = [];

    listaDart.forEach(i => {
      resultDart.push({ "nome_repo": i });
    });
    const jsonDart = JSON.stringify(resultDart);
    console.log(jsonDart);

    listaKot.forEach(i => {
      resultKot.push({ "nome_repo": i });
    });
    const jsonKot = JSON.stringify(resultKot);
    console.log(jsonKot);

    listaJs.forEach(i => {
      resultJs.push({ "nome_repo": i });
    });
    const jsonJs = JSON.stringify(resultJs);
    console.log(jsonJs);

    listaRuby.forEach(i => {
      resultRuby.push({ "nome_repo": i });
    });
    const jsonRuby = JSON.stringify(resultRuby);
    console.log(jsonRuby);

    listaSwift.forEach(i => {
      resultSwift.push({ "nome_repo": i });
    });
    const jsonSwitf = JSON.stringify(resultSwift);
    console.log(jsonSwitf);

    axios.post('http://localhost:3001/pesquisas',{
      jsonDart,
      jsonKot,
      jsonJs,
      jsonRuby,
      jsonSwitf
    })
    .then(() => {
      alert('Pesquisa armazenada!');
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className='container'>
          <div className='card card-body'>
            <h2>Faça a pesquisa de 3 repositórios das seguintes linguagens: </h2>
            <h4>Se desejar, armazene o resultado da pesquisa.</h4>
            <ul className='list-inline'>
              <li className='list-inline-item'>Dart</li>
              <li className='list-inline-item'>Kotlin</li>
              <li className='list-inline-item'>JavaScript</li>
              <li className='list-inline-item'>Ruby</li>
              <li className='list-inline-item'>Swift</li>
            </ul>
            <div>
              <button style={{ margin: 10 }} onClick={this.getRepo} id='pesquisar' type='button' className='btn btn-info'>Pesquisar</button>
              <button style={{ margin: 10 }} onClick={this.armazenaRepos} id='armazenar' type='submit' className='btn btn-secondary'>Armazenar</button>
            </div>
            <div>
              {this.state.reposDart.length !== 0 ? this.renderReposDart() : null}
              {this.state.reposKot.length !== 0 ? this.renderReposKotlin() : null}
              {this.state.reposJs.length !== 0 ? this.renderReposJs() : null}
              {this.state.reposRuby.length !== 0 ? this.renderReposRuby() : null}
              {this.state.reposSwift.length !== 0 ? this.renderReposSwift() : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
