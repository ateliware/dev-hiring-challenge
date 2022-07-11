<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Repositórios Github') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-6 col-md-5 col-lg-6">
                                <h4>Pesquisar repositórios de determinada usuário</h4><br/>
                                <h6>Pesquise por outro usuário<br/>Se pesquisar pelo usuário "luanzanatta" encontrará esta aplicação</h6><br/>
                                <form method="POST"> 
                                    @csrf
                                    <div class="mb-3">
                                        <div class="col">
                                            <input type="text" class="form-control" placeholder="Nome do usuário" name="id2">
                                        </div></br>
                                        <button class="btn btn-primary" type="submit">Procurar</button>
                                    </div>
                                </form>
                            </div>
                            <div class="col-sm-6 col-md-5 offset-md-2 col-lg-6 offset-lg-0">
                                <h4>Adicione os repositórios aos seus favoritos</h4><br/>
                                <h6>Adicionar repositórios aos favoritos posibilitará o acesso rápido por meio do menu "Favoritos".
                                    Além de disponibilizar mais detalhes dos repositórios sem precisar acessar o GitHub
                                </h6><br/>
                                <form action="{{ route('api.store') }}" method="POST">
                                    @csrf
                                    @method('PUT')
                                    <select class="form-select" id="floatingSelectGrid" name="dadosfav">
                                        <option value="" disabled selected>Selecionar</option>
                                        @foreach ($userIds as $userId)
                                        <option value="{{$userId['full_name']}}"> {{$userId['full_name']}} </option>
                                        @endforeach
                                    </select></br>
                                    <button type="submit" class="btn btn-success">Adicionar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <br>
                    <table class="table table-striped table-hover">
                        <thead>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>URL</th>
                        </thead>
                        <tbody>
                            @foreach($userIds as $userId)
                                <tr>
                                    @csrf
                                    @method('PUT')
                                    <td>{{$userId['id']}}</td>
                                    <td>{{$userId['full_name']}}</td>
                                    <td>{{$userId['description']}}</td>
                                    <td>
                                        <form>
                                            <a target="_balank" href="{{$userId['html_url']}}">
                                            <input type="button" class="btn btn-success" value="Acessar">
                                            </a>
                                        </form>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>