@extends('layouts.app')

@section('title', 'Repositórios')

@section('content')
  <div class="container">
    <div class="row justify-content-center mt-4">
      <div class="col-lg-6 col-md-6 col-sm-12">
        <div class="card shadow">
          <div class="card-header">Busca por repositórios</div>
          <div class="card-body">
            <form action="{{ route('search') }}" method="post">
              @csrf
              <div class="form-row">
                <div class="col-lg-12 col-md-12 col-sm-12 my-3">
                  <div class="form-group">
                    <label class="form-control-label" for="Lang" data-toggle="select">
                      Linguagens
                    </label>
                    <select class="form-control languages"
                            id="Lang" multiple="multiple" name="languages[]">
                    </select>
                  </div>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12">
                  <div class="btn-group-sm text-right">
                    <button type="submit" class="btn btn-outline-dark">
                      <i class="fas fa-search"></i> Buscar
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12">
        <div class="card shadow">
          <div class="card-header">Listagem de repositórios</div>
          <div class="card-body">
            <ul class="list-group">
              @forelse($repositories as $repository)
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <a href="{{ route('repositories.show', $repository->id) }}" class="nav-link">
                    {{$repository->name}} - {{$repository->query}}
                  </a>
                  <span class="badge badge-success">{{$repository->stars}}</span>
                </li>
              @empty
                Informe uma linguagem para ser listados os repositórios
              @endforelse
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection

@push('scripts')
  <script>
      $(function () {
          $('.languages').select2({
              tags: true,
              tokenSeparators: [',', ' ', ';'],
              placeholder: 'PHP, Python, C++',
              maximumSelectionLength: 5,
              allowClear: true,
              width: 'resolve',
          });
      });
  </script>
@endpush