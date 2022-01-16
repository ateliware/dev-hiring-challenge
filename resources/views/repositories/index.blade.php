@extends('repositories.layout')

@section('content')
    <form method="post" action="{{ route('repositories.save') }}">
        <div class="flex justify-between">
            <h2 class="">Repositorios Encontrados</h2>
            @csrf
            <button type="submit" name="btnAtualizar" value="Submit" class="btn btn-primary">
                Buscar Repositórios
            </button>
        </div>
    </form>

    <hr/>

    <table class="table table-striped">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Linguagem Principal</th>
                <th>Ação</th>
            </tr>
        </thead>
        @foreach ($repositories as $repository)
            <tbody>
                <tr>
                    <td>
                        {{ $repository->name }}
                    </td>
                    <td >
                        {{ $repository->languagename }}
                    </td>
                    <td>
                        <a href="{{ route('repositories.show',$repository->id) }}">Ver detalhes</a>
                    </td>
                </tr>
            </tbody>
        @endforeach
    </table>
    <div class="pt-4">
        {!! $repositories->links() !!}
    </div>
@endsection