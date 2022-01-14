@extends('repositories.layout')
@section('content')
    <form method="post" action="#">
        <div class="flex justify-between">
            <h2 class="text-5xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">GitHub List</h2>
            @csrf
            <button type="submit" name="send" value="Submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Buscar Repositórios
            </button>
        </div>
    </form>
@endsection