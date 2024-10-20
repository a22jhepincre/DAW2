<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatorController extends Controller
{
    //
    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
//            $request->session()->regenerate();
            $user = Auth::user();

            $token = $user->createToken('auth_token')->plainTextToken;
//            session(['auth_token' => $token]);
//            return redirect('/category')->with('success', 'Usuario iniciado sesión exitosamente');

            return response()->json(['status' => 'success', 'message' => 'Credentials validated', 'token' => $token, 'user' => $user]);
        }

        return response()->json(['status' => 'success', 'message' => 'Invalid credentials']);
    }

    public function logout()
    {
        Auth::logout();
//        return redirect('/login')->with('success', 'Has cerrado sesión con éxito.');
        return response()->json(['status' => 'success', 'message' => 'Logged out']);
    }

    public function register(Request $request)
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

            $token = $user->createToken('auth_token')->plainTextToken;
            Auth::login($user);
//            session(['auth_token' => $token]);
//            Mail::to($user->email)->send(new RegisterNewUserMail($user));

//            return redirect('/category')->with('success', 'Usuario registrado e iniciado sesión exitosamente');
            return response()->json(['status' => 'success', 'message' => 'User created', 'token' => $token, 'user' => $user]);

        } catch (\Exception $e) {
//            return back()->withErrors(['error' => 'Hubo un problema al registrar el usuario: ' . $e->getMessage()])->withInput();
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
}
