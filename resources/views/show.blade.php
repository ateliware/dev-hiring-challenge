@extends('template')

@section('content')
<div class="main mx-auto sm:px-6 lg:px-8">
    <div class="flex justify-center pt-8 sm:pt-0">
        <a href="{{$repository['url']}}" target="_blank" class="blue underline text-gray-900 dark:text-white"><h1>{{$repository['full_name']}}</h1></a>
    </div>
    <div class="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
        <div class="grid grid-cols-1 md:grid-cols-1">
            <div class="p-6">
                <div class="flex items-center">
                    <i class="fas fa-box dark:text-gray-400"></i>
                    <div class="ml-4 text-lg leading-7 font-semibold">
                        <a href="{{$repository['url']}}" target="_blank" class="blue underline text-gray-900 dark:text-white">{{$repository['name']}}</a>
                    </div>
                </div>
                <div class="ml-2">
                    <div class="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                        {{$repository['description']}}
                    </div>
                </div>
                <div class="ml-2">
                    <div class="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                        <i class="far fa-star"></i>
                        {{$repository->stargazers_count}}
                        <i class="far fa-eye ml-4"></i>
                        {{$repository->watchers_count}}
                        <i class="fas fa-circle ml-4 {{Str::lower(Str::replace('#', '', $repository['language']))}}" title="{{$repository['language']}}"></i>
                        {{$repository['language']}}
                        <i class="far fa-calendar ml-4" title="{{$repository['updated_at']}}"></i>
                        Atualizado {{(new Carbon\Carbon($repository['updated_at']))->diffForHumans()}}
                    </div>
                </div>
                <div class="ml-2">
                    <hr class="with-border">
                    <div class="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                        <span>Tamanho: {{$repository->size}} KB</span>
                        <span class="ml-4">Issues: {{$repository->open_issues_count}}</span>
                        <span class="ml-4">Forks: {{$repository->forks_count}}</span>
                    </div>
                    <div class="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                        <span>Clonar: <a href="{{$repository->clone_url}}" class="blue">{{$repository->clone_url}}</a></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="flex justify-center mt-4 items-center">
        <div class="ml-4 text-center text-sm text-gray-500 sm:ml-0">
            <a href="{{route('home')}}" class="blue">Voltar</a>
        </div>
    </div>
</div>
@endsection