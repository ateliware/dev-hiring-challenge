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

    <table class="table table-striped">
        <thead>
            <tr>
                <th>Descrição</th>
                <th>URL</th>
                <th>Linguagem</th>
                <th>Criado em</th>
                <th>Atualizado em</th>
                <th>Observadores</th>
                <th>Estrelas</th>
                <th>Issues</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>{{ $repository->description }}</td>
                <td>
                    <a href="{{ $repository->html_url }}" target="_blank">
                        {{ $repository->html_url }}
                    </a>
                </td>
                <td>{{ $repository->language->name }}</td>
                <td>{{ $repository->created_at }}</td>
                <td>{{ $repository->updated_at }}</td>
                <td>{{ $repository->watchers_count }}</td>
                <td>{{ $repository->stargazers_count }}</td>
                <td>{{ $repository->open_issues_count }}</td>
            </tr>
        </tbody>
    </table>

    <hr>
    <div class="">
        <a class="btn btn-primary btn-outline" href="{{ route('repositories.index') }}">Voltar</a>
    </div>
@endsection