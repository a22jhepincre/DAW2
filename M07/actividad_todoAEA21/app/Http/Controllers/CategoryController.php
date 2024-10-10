<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return view('Category.category');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'idUser'=>'required',
            'name' => 'required'
        ],[
            'idUser.required' => 'El campo id es obligatorio',
            'name.required' => 'El campo nombre es obligatorio'
        ]);

        $category = new Category();
        $category->idUser = $data['idUser'];
        $category->name = $data['name'];

        $category->save();
        return response()->json(['status'=>'success', 'message'=>'Categoria creada', 'category'=>$category]);
    }

    public function update(Request $request)
    {
        $id = $request->id ?? '';
        $name = $request->name ?? '';

        $category = Category::findOrFail($id);

        $category->name = $name;
        $category->save();

        return response()->json(['status'=>'success', 'message'=>'Categoria actualizada', 'category'=>$category]);
    }

    public function delete($id)
    {
        $category = Category::findOrfail($id);
        $category->delete();
        return response()->json(['status'=>'success', 'message'=>'Categoria eliminada', 'category'=>$category]);
    }
}
