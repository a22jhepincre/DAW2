<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return view('user.index');
    }

    public function getAll()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required'
        ],
        [
            'name.required' => 'El campo nombre es obligatorio',
            'email.required' => 'El campo email es obligatorio',
            'password.required' => 'El campo password es obligatorio'
        ]);

        $user = new User();
        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->password = $data['password'];

        $user->save();

        return response()->json(['status'=>'success', 'message'=>'Usuario añadido', 'user'=>$user]);
    }

    public function update(Request $request)
    {
        $id = $request->id ?? '';
        $name = $request->name ?? '';
        $email = $request->email ?? '';

        $user = User::findOrFail($id);

        $user->name = $name;
        $user->email = $email;
        $user->save();

        return response()->json(['status'=>'success', 'message'=>'Usuario actualizado', 'user'=>$user]);
    }

    public function delete($id)
    {
        $user = User::findOrfail($id);
        $user->delete();
        return response()->json(['status'=>'success', 'message'=>'Usuario eliminado', 'user'=>$user]);
    }
}
