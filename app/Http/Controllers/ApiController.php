<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ApiController extends Controller
{
    public function index(){
          return view('apis.index');
    }

    public function listar(Request $request){
        //$id = "microsoft";
        $id = $request->input('id');
        //dump($id);  
        $response = Http::get('https://api.github.com/search/repositories?q=language:'.$id.'&sort=stars&order=desc')->json('items');
        $collection = collect($response);
        $userId = $collection -> collect('language','full_name', 'description','html_url');
        //dump($userId);
          return view('apis.listar', [
            'userIds' => $userId,
        ]);
    }

    public function listar2(Request $request){
        $id2 = $request->input('id2');
        $response = Http::get('https://api.github.com/users/'.$id2.'/repos')->json();
        $collection = collect($response);
        $userId = $collection -> collect('id','full_name', 'description','html_url');
        //dump($userId);
          return view('apis.listar2', [
            'userIds' => $userId,
        ]);
    }
}

