@extends('layouts.app')

@section('title', 'Detalhes')

@section('content')
  <div class="row justify-content-center mt-4">
    <div class="col-lg-8 col-md-8 col-sm-12">
      <div class="card shadow">
        <div class="card-header">
          <h3>
            {{ $repository->full_name }}
          </h3>
        </div>
        <div class="card-body">
          <img src="{{ $repository->avatar_url }}"
               class="rounded-circle shadow-sm m-4" width="125" height="125" alt="...">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Owner</th>
              <th scope="col">Description</th>
              <th scope="col">Stars</th>
              <th scope="col">Language</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                {{ $repository->owner_name }}
              </td>
              <td>
                {{ $repository->description ?? 'Sem descrição' }}
              </td>
              <td>
                {{ $repository->stars }}
              </td>
              <td>
                {{ $repository->language ?? 'Sem Linguagem' }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer">
          <a href="{{ route('repositories.index') }}" class="btn btn-outline-danger btn-sm">
            <i class="fas fa-long-arrow-alt-left mr-2"></i> Voltar
          </a>
        </div>
      </div>
    </div>
  </div>
@endsection