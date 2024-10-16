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
