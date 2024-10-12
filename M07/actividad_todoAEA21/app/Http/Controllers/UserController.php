<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        return view('User.user');
    }

    public function getAll()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'username' => 'required',
            'email' => 'required|email',
            'password' => 'required'
        ],
            [
                'username.required' => 'El campo nombre es obligatorio',
                'email.required' => 'El campo email es obligatorio',
                'email.email' => 'El campo email debe ser una dirección válida',
                'password.required' => 'El campo password es obligatorio'
            ]);

        try {
            $user = new User();
            $user->name = $data['username'];
            $user->email = $data['email'];
            $user->password = $data['password'];
            $user->save();

            Auth::login($user);

            return redirect('/category')->with('success', 'Usuario registrado e iniciado sesión exitosamente');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Hubo un problema al registrar el usuario: ' . $e->getMessage()])->withInput();
        }
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
