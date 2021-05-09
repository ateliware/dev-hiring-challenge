@extends('repositories.layout')

@section('content')

    <form method="post" action="{{ route('repositories.store') }}">
        <div class="flex justify-between">
            <h2 class="text-5xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">GitHub List</h2>
            @csrf
            <button type="submit"
                    name="send"
                    value="Submit"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Atualizar
            </button>
        </div>

        <div class="row">
            <label class="inline-flex items-center mt-3">
                <input type="checkbox" class="form-checkbox h-5 w-5 text-red-600" name="topics[]" value="Node.js" checked>
                <span class="ml-2 text-gray-700">Node.js</span>
            </label>
            <label class="inline-flex items-center mt-3">
                <input type="checkbox" class="form-checkbox h-5 w-5 text-red-600" name="topics[]" value="Python" checked>
                <span class="ml-2 text-gray-700">Python</span>
            </label>
            <label class="inline-flex items-center mt-3">
                <input type="checkbox" class="form-checkbox h-5 w-5 text-red-600" name="topics[]" value="Elixir" checked>
                <span class="ml-2 text-gray-700">Elixir</span>
            </label>
            <label class="inline-flex items-center mt-3">
                <input type="checkbox" class="form-checkbox h-5 w-5 text-red-600" name="topics[]" value="Ruby" checked>
                <span class="ml-2 text-gray-700">Ruby</span>
            </label>
            <label class="inline-flex items-center mt-3">
                <input type="checkbox" class="form-checkbox h-5 w-5 text-red-600" name="topics[]" value="React.JS" checked>
                <span class="ml-2 text-gray-700">React.JS</span>
            </label>
        </div>

    </form>

    <div class="flex flex-col pt-12">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nome
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Linguagem
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
                                        <div class="text-sm font-medium text-gray-900">{{ $repository->language }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <a href="{{ route('repositories.show',$repository->id) }}" class="text-indigo-600 hover:text-indigo-900">Mostrar</a>
                                    </td>
                                </tr>
                            </tbody>
                        @endforeach
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="pt-4">
        {!! $repositories->links() !!}
    </div>
@endsection
