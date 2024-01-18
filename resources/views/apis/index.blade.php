<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Repositórios Github') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 col-md-5 col-lg-6">
                        <div class="p-6 bg-white border-b border-gray-200">
                            <div>
                                <h4>Pesquise repositórios por linguaguem</h4><br/>
                                <h6>Digite o nome da linguagem que você gostaria de pesquisar os repositórios do GitHub</h6><br/>
                                <form action="{{ route('api.listar') }}" method="POST">
                                    @csrf
                                    <div class="mb-3">
                                        <div class="col">
                                            <input type="text" class="form-control" placeholder="Linguagem: php, java, c#..." name="id">
                                        </div></br>
                                        <button class="btn btn-primary" type="submit">Procurar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-5 offset-md-2 col-lg-6 offset-lg-0">
                        <div class="p-6 bg-white border-b border-gray-200">
                            <div>
                                <h4>Procure repositórios de cada usuário</h4><br/>
                                <h6>Digite o nome de usuário do GitHub de quem você deseja encontrar os repositórios</h6><br/>
                                <form action="{{ route('api.listar2') }}" method="POST"> 
                                    @csrf
                                    <div class="mb-3">
                                        <div class="col">
                                            <input type="text" class="form-control" placeholder="Usuário: ateliware, instagram, luanzanatta..." name="id2">
                                        </div></br>
                                        <button class="btn btn-primary" type="submit">Procurar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
    

    
