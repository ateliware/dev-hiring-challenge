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
        <thead class="bg-gray-50">
        <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Linguagem Principal
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ação
            </th>
        </tr>
        </thead>
        @foreach ($repositories as $repository)
            <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="text-sm font-medium text-gray-900">
                                {{ $repository->name }}
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{{ $repository->languagename }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="{{ route('repositories.show',$repository->id) }}" class="text-indigo-600 hover:text-indigo-900">Ver detalhes</a>
                    </td>
                </tr>
            </tbody>
        @endforeach
    </table>
    <div class="pt-4">
        {!! $repositories->links() !!}
    </div>
@endsection