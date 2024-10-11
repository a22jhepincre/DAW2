<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return view('Category.category', compact('categories'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required'
        ],[
            'name.required' => 'El campo nombre es obligatorio'
        ]);

        $category = new Category();
        $category->idUser = Auth::user()->id;
        $category->name = $data['name'];

        $category->save();
//        return response()->json(['status'=>'success', 'message'=>'Categoria creada', 'category'=>$category]);
        return back()->with('success', 'Categoria creada!');
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
