@extends('repositories.layout')

@section('content')
    <div class="flex justify-between">
        <h2 class="">Detalhes do Repositório</h2>
    </div>

    <hr/>

    <div class="row pb-5">
        <h1 class="text-5xl">
            <a href="{{ $repository->html_url }}" target="_blank">
            {{ $repository->name }}
            </a>
        </h1>
    </div>

    <div class="row">
        <div class="col">
            <strong>Linguagem Principal:</strong>
            {{ $repository->languagename; }}
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
            <strong>Criado em:</strong>
            {{ $repository->created_at }}
        </div>
    </div>

    <div class="row">
        <div class="col">
            <strong>Última atualização:</strong>
            {{ $repository->pushed_at }}
        </div>
    </div>

    <div class="row">
        <div class="col">
            <strong>Estrelas:</strong>
            <i class="fa fa-start">{{ $repository->stargazers_count }}</i>
        </div>
    </div>

    <div class="row">
        <div class="col">
            <strong>Issues:</strong>
            <i class="fa fa-code-fork">{{ $repository->open_issues_count }}</i>
        </div>
    </div>

    <div class="row pt-4">
        <a class="btn btn-primary btn-outline" href="{{ route('repositories.index') }}">Voltar</a>
    </div>
@endsection