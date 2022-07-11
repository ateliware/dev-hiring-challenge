<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Favoritos') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <h2>Lista de repositórios farovitos </h2><br/>
            @foreach($lista_fav as $fav)
            <div class="card">
                <h6 class="card-header"><strong>Nome completo: </strong> {{ $fav->full_name }}<br/><br/><strong>ID:</strong> {{ $fav->id }}  </h6>
                <div class="card-body">
                    <h6 class="text-secondary"2>Nome</h6>
                    <h4 class="card-title">{{ $fav->name }}</h4><br/>
                    <h6 class="text-secondary"2>Descrição</h6>
                    <p>{{ $fav->description }}</p><br/>
                    <div class="container">
                        <div class="row">
                            <div class="col-6 col-sm-3">
                                <h6 class="text-secondary"2>Linguagem</h6>
                                <p>{{ $fav->language }}</p><br/>
                            </div>
                            <div class="col-6 col-sm-3">
                                <h6 class="text-secondary"2>Visibilidade</h6>
                                <p>{{ $fav->visibility }}</p><br/>
                            </div>
                            <div class="col-6 col-sm-3">
                                <h6 class="text-secondary"2>Data de criação</h6>
                                <p>{{ $fav->created_at }}</p><br/>
                            </div>
                            <div class="col-6 col-sm-3">
                                <h6 class="text-secondary"2>Data da ultima atualização</h6>
                                <p>{{ $fav->updated_at }}</p><br/>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <h6 class="text-secondary"2>Ações</h6>
                        <div class="row">
                            <div class="col-6 col-sm-1">
                                <form>
                                    <a target="_balank" href="{{ $fav->html_url }}">
                                    <input type="button" class="btn btn-success" value="Acessar">
                                    </a>
                                </form>
                            </div>
                            <div class="col-6 col-sm-1">
                                 <form action="{{ route('apifav.destroy', ['id'=>$fav->id]) }}" method="POST">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-danger">Remover</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div><br/><br/>
            @endforeach
        </div>
    </div>
</x-app-layout>
    
