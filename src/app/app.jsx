import React, { useState } from 'react';


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { SearchBar } from 'components';
import { TopNavBar } from 'components';
import { ResultTable } from 'components';


class App extends React.Component {

  constructor() {
    super();
    
 		 this.state={
        items:[],
        isLoading: false,
        isLoaded: false,
        visibility: "hidden"
      };

      this.search = this.search.bind(this);
      this.saveResults = this.saveResults.bind(this);
  
  }

  saveResults(data) {
    fetch(`/api/save_search`)
    .then((response) => response.json())
    .then(users => console.log(users));
  }


  search(languages){

    //Se languages não estiver mais vazio é porque está carregando as informações...
    if(languages.length != 0){
      this.setState({
        isLoading: true,
        items: [],
        isLoaded: false
      })
      
      for(let i = 0; i < languages.length; i++){
        
        //Faz a busca na API para cada linguagem selecionada...
        fetch(`https://api.github.com/search/repositories?q=+language:${languages[i]}&sort=stars&order=desc`)
        .then((response)=> {
          if (response.status >= 200 && response.status <= 299) {
            return response.json();
          } else {
            alert("Erro na request: " + response.statusText);
          }
        })
        .then(
          (result) => {
            this.setState({
              isLoading: false,
              //aqui concateno os resultados recebidos no state.items
              items: this.state.items != [] ? this.state.items.concat(result.items) : result.items,
              visibility: "show"
            });
            //console.log(this.state.languages[i])

            //Chegou no final das linguagens selecionadas, finalizo e salvo no banco.
            if(i == languages.length-1){
              this.setState({
                isLoaded: true
              })
                // POST Request na API para salvar no banco de dados
                const requestOptions = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(this.state.items)
              };
              fetch('api/save_results', requestOptions)
                  .then(response => response.json())
                  .then(data => this.setState({ postId: data.id }));
            }

          }
        ).catch(function(error){
          console.log(error)
        })
      }


        
    }

  }

  render() {
    
    return (
      
      <div className="App">

        <TopNavBar />

        <img src={process.env.PUBLIC_URL + '/github-mark.png'} className="App-logo" alt="logo" />
        <p>Selecione as linguagens desejadas e clique em <code>Buscar</code>.</p>

        <SearchBar search={this.search} />

        <ResultTable visibility={this.state.visibility}  items={this.state.items} isLoading={this.state.isLoading} isLoaded={this.state.isLoaded}   />
        
      </div>

    );
  }
}

export default App;
