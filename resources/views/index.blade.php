@extends('template')

@section('content')
<div class="main mx-auto sm:px-6 lg:px-8">
    <div class="flex justify-center pt-8 sm:pt-0">
        <h1 class="dark:text-white">Most Stars Projects on Github</h1>
    </div>
    <div class="flex justify-center">
        <div class="ml-4 text-center text-sm text-gray-500 sm:text-right sm:ml-0">
            <a href="{{route('refresh')}}" class="refresh"><i class="fas fa-sync-alt ml-4 blue" title="Atualizar"></i> Atualizar</a>
        </div>
    </div>
    <div class="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
        <div class="grid grid-cols-1 md:grid-cols-1">
            @if (session()->has('error'))
            <h4 class="p-1 red">Não foi possível estabelecer conexão com a API do Github. Tente novamente em alguns minutos :)</h4>
            @endif
            @forelse ($items as $item)
            <div class="p-6">
                <div class="flex items-center">
                    <i class="fas fa-box dark:text-gray-400"></i>
                    <div class="ml-4 text-lg leading-7 font-semibold">
                        <a href="{{$item['url']}}" class="blue underline text-gray-900 dark:text-white">{{$item['full_name']}}</a>
                    </div>
                </div>
                <div class="ml-2">
                    <div class="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                        {{$item['description']}}
                    </div>
                </div>
                <div class="ml-2">
                    <div class="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                        <i class="far fa-star"></i>
                        {{$item['stargazers_count']}}
                        <i class="fas fa-circle ml-4 {{Str::lower(Str::replace('#', '', $item['language']))}}" title="{{$item['language']}}"></i>
                        {{$item['language']}}
                        <i class="far fa-calendar ml-4" title="{{$item['updated_at']}}"></i>
                        Atualizado {{(new Carbon\Carbon($item['updated_at']))->diffForHumans()}}
                    </div>
                </div>
            </div>
            @empty
            <h2 class="p-1 red">Nenhum projeto para exibir :/ (clique em atualizar)</h2>
            @endforelse
        </div>
    </div>
    <div class="flex justify-center mt-4 items-center">
        <div class="ml-4 text-center text-sm text-gray-500 sm:ml-0">
            {{$items->links()}}
        </div>
    </div>
</div>
@endsection