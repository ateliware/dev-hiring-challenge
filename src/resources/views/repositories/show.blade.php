@extends('repositories.layout')
@section('content')
    <div class="row pb-5">
        <h1 class="text-5xl">{{ $repository->name }}</h1>
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
            <strong>Descrição:</strong>
            {{ $repository->description }}
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
            <strong>Forks:</strong>
            {{ $repository->forks_count }}
        </div>
    </div>
    <div class="row">
        <div class="col">
            <strong>Issues:</strong>
            {{ $repository->open_issues_count }}
        </div>
    </div>
    <div class="row">
        <div class="col">
            <strong>Tamanho:</strong>
            {{ $repository->size }}
        </div>
    </div>
    <div class="row">
        <div class="col">
            <strong>Url:</strong>
            <a href="{{ $repository->url }}">{{ $repository->url }}</a>
        </div>
    </div>
    <div class="row pt-4">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <a class="btn btn-primary" href="{{ route('repositories.index') }}"> Voltar</a>
        </button>
    </div>
@endsection
