<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Note;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::where('idUser', Auth::id())->get();
        return view('Category.category', compact('categories'));
    }
    public function getCategories()
    {
        $categories = Category::all();
        $pdf = Pdf::loadView('Category.pdf', compact('categories'));
        return $pdf->download('pdf.pdf');
    }

    public function store(Request $request)
    {
        try {
            // Validar los datos de entrada
            $data = $request->validate([
                'name' => 'required|string|max:255',
            ], [
                'name.required' => 'El campo nombre es obligatorio',
                'name.string' => 'El nombre debe ser una cadena de texto.',
                'name.max' => 'El nombre no puede tener más de 255 caracteres.',
            ]);

            // Crear la nueva categoría
            $category = new Category();
            $category->idUser = Auth::id();
            $category->name = $data['name'];
            $category->save();

            // Renderizar la vista de la tarjeta de categoría
            $cardTemplate = view('Category.templates.card-category', compact('category'))->render();

            // Devolver la respuesta JSON
            return response()->json([
                'status' => 'success',
                'message' => 'Categoría creada',
                'category' => $category,
                'cardTemplate' => $cardTemplate,
            ]);
        } catch (\Exception $e) {
            // Manejar el error y devolver un JSON con un mensaje de error
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500); // Cambiar el código de estado si es necesario
        }
    }



    public function update(Request $request)
    {
        $id = $request->id ?? '';
        $name = $request->name ?? '';

        $category = Category::findOrFail($id);

        $category->name = $name;
        $category->save();

        return response()->json(['status'=>'success', 'message'=>'Categoria actualizada', 'category'=>$category]);
//        return back()->with('success', 'Categoria editada!');

    }

    public function delete($id)
    {
        $notes = Note::where('idCategory', $id)->get();
        foreach ($notes as $note) {
            $note->delete();
        }

        $category = Category::findOrfail($id);
        $category->delete();
        return response()->json(['status'=>'success', 'message'=>'Categoria eliminada', 'category'=>$category]);
//        return back()->with('success', 'Categoria eliminada!');

    }
}
