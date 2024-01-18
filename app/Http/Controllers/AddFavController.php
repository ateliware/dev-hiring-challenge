<?php

namespace App\Http\Controllers;

use App\Models\Apifav;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;

class AddFavController extends Controller
{
    public function index(){
        $lista = Apifav::all();
        //dd($lista);
        return view('fav.index', ['lista_fav'=>$lista]);
    }

  public function store(Request $request){
    $id3 = $request->input('dadosfav');
    $response = Http::get('https://api.github.com/repos/'.$id3)->json();
    $collection = collect($response);
    $userId = $collection -> collect('full_name', 'name', 'description','html_url', 'language', 'created_at', 'updated_at', 'visibility');   
    //dd($userId); 
    Apifav::create($userId->all());
    return redirect()->route('apifav.index');
    }

    public function destroy($id)
    {
        $apifav = Apifav::findOrFail($id);
        $apifav->delete();
        return redirect()->route('apifav.index');
    }
}
