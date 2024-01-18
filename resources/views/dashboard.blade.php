<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="card text-center">
                    <div class="card-header">
                        Bem-Vindo!
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Desafio técnico para desenvolvedores</h5>
                        <p class="card-text">Meu nome é Luan Zanatta e desenvolvi essa aplicação 
                            com o objetivo de mostrar minhas habilidades para o desafio técnico da Ateliware.
                        </p>
                        <h5 class="card-title">Funcionamento</h5>
                        <p class="card-text">Na página "Api GitHub, que pode ser acessada no menu superior, podemos realizar a pesquisa 
                            por repositórios no github. A caixa de pesquisa do canto esquerdo possibilita procurar repositórios por 
                            meio do nome a linguagem na qual eles foram desenvolvidos e a caixa de pesquisa no canto direito, possibilita 
                            pesquisar quais são os repositórios públicos de determinado usuário do github. Os dados apresentados
                            na busca por meio do nome da linguagem são apresentados em ordem decrescente de estrelas, já a pesquisa 
                            por nome de usuários, os resultados são no padrão default de pesquisa do github.<br/><br/>Em ambas as pesquisas 
                            podemos adicionar repositórios específicos aos favoritos. Para fazer isso, selecione no select, o nome do 
                            repositório que deseja favoritar. Ao favoritar você será redirecionado para a página dos favoritos, onde 
                            terá mais informações sobre cada repositório adicionado, além de poder remove-los dos seus favoritos e acessar 
                            o link que te redireciona direto para a página do repositório no github. A página de favs pode ser acessada por 
                            meio do menu superior ou adicionando um novo favorito a lista<br/><br/>A aplicação foi desenvolvida em Laravel
                            <br/>Utiliza o banco de dados MySQL<br/>Deploy realizado no Heroku<br/>Está disponível no Github<br/>Salva os 
                            favoritos no BD<br/>Utiliza a API do Github<br/>É uma aplicação nova<br/>Linguagem PHP & JS<br/>Está Dockernizada
                        </p>
                    </div>
                    <div class="card-footer text-muted">
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
