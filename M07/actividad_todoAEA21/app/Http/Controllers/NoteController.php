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
            'name' => 'required',
            'description' => 'optional',
        ],[
            'idCategory.required' => 'El campo id es obligatorio',
            'name.required' => 'El campo nombre es obligatorio'
        ]);

        $note = new Note();
        $note->idUser = $data['idCategory'];
        $note->name = $data['name'];
        $note->description = $data['description'];

        $note->save();
        return response()->json(['status'=>'success', 'message'=>'Nota creada', 'note'=>$note]);
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

        return response()->json(['status'=>'success', 'message'=>'Nota actualizada', 'note'=>$note]);
    }

    public function delete($id)
    {
        $note = Note::findOrfail($id);
        $note->delete();
        return response()->json(['status'=>'success', 'message'=>'Categoria eliminada', 'note'=>$note]);
    }
}
