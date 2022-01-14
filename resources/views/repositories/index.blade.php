@extends('repositories.layout')

@section('content')
    <form method="post" action="#">
        <div class="flex justify-between">
            <h2 class="">Repositorios Encontrados</h2>
            @csrf
            <button type="submit" name="btnAtualizar" value="Submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
                Buscar Repositórios
            </button>
        </div>
    </form>

    <hr/>
@endsection