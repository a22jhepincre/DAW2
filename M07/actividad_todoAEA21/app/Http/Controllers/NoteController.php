<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index()
    {
        return view('Note.note');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'idCategory'=>'required',
            'title' => 'required',
            'description' => 'nullable',
        ],[
            'idCategory.required' => 'El campo id es obligatorio',
            'name.required' => 'El campo nombre es obligatorio'
        ]);

        $note = new Note();
        $note->idCategory = $data['idCategory'];
        $note->title = $data['title'];
        $note->description = $data['description'];

        $note->save();
//        return response()->json(['status'=>'success', 'message'=>'Nota creada', 'note'=>$note]);
        return back()->with('success', 'Categoria creada!');

    }

    public function update(Request $request)
    {
        $id = $request->id ?? '';
        $title = $request->title ?? '';
        $description = $request->description ?? '';

        $note = Note::findOrFail($id);

        $note->title = $title;
        $note->description = $description;
        $note->save();

//        return response()->json(['status'=>'success', 'message'=>'Nota actualizada', 'note'=>$note]);
        return back()->with('success', 'Categoria actualizada!');

    }

    public function delete($id)
    {
        $note = Note::findOrfail($id);
        $note->delete();
        return response()->json(['status'=>'success', 'message'=>'Categoria eliminada', 'note'=>$note]);
    }
}
