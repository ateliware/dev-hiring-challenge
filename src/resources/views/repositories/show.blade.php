@extends('repositories.layout')
@section('content')
    <div class="row">
        <h1>{{ $repository->name }}</h1>
    </div>

    <div class="row">
        <div class="col">
            <strong>Linguagem:</strong>
            {{ $repository->language }}
        </div>
    </div>
    <div class="row p">
        <div class="col">
            <strong>Estrelas:</strong>
            {{ $repository->stargazers_count }}
        </div>
    </div>
    <div class="row">
        <div class="col">
            <strong>Observadores:</strong>
            {{ $repository->watchers_count }}
        </div>
    </div>

    <div class="row">
        <div class="col">
            <strong>Url:</strong>
            <a href="{{ $repository->url }}">{{ $repository->url }}</a>
        </div>
    </div>
    <div class="row">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <a class="btn btn-primary" href="{{ route('repositories.index') }}"> Voltar</a>
        </button>
    </div>
@endsection
