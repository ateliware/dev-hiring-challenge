
# Desafio técnico Ateliware

## Application Design

  A aplicação foi feita em Java, em seguida listo e justifico a escolha de cada um 
  dos componentes:  

* _Spring Boot 2_ (framework principal) - escolhido pela facilidade de desenvolvimento 
  e sua alta portabilidade desse sistema.  
  
* _Maven_ (ferramenta de build) - padrão bem usado e consolidado de build, inclusive 
  usado também pelas principais ferramentas DevOps.
  
* _Lombok_ (biblioteca) - para gerar os getters,setters,builders e loggers.

* _Thymeleaf_ - template padrão de páginas web

* _GitHub API for Java_ - biblioteca ( http://github-api.kohsuke.org ) indicada pelo GitHub Developer Guide ( https://developer.github.com/v3/libraries/ )

## Application Architecture

* A aplicação usa o padrão: _Controller -> Service -> Repository_ ;
* Pela simplicidade do sistema não foram usados _Facades_;
* O banco de dados escolhido foi o _PostgreSQL_.

## Conventions

Foram escolhidas 5 linguagens para importar os repositórios: Java, JavaScript, Python e Ruby.

De cada linguagem serão importadas apenas as 5 primeiras com mais votos (stars).

Toda vez que o sistema sobe, ele remove os dados anteriores armazenados. 

A API de busca no GitHub não é rápida, por isso o método de carga é assíncrono, 
é possível iniciar o processo e depois acompanhar o seu status. 

## Opções do sistema

* _Home_ - lista os repositórios armazenados 
* _Import Start_ - inicia o import dos repositórios, informando o critério de busca (é sugerido "freeze" )
* _Import Status_ - acompanha o status de execução da importação de repositórios do GitHub
* _Purge Database_
 - remove todos os repositórios armazenados 

# Deploy

O sistema está disponível em https://dev-hiring-challenge-ateliware.herokuapp.com

# TODO

Aumentar a cobertura de testes, atualmente apenas cobrem a página inicial.
