<?php

namespace App\Http\Controllers;

use App\Mail\RegisterMail;
use App\Mail\UserInfoMail;
use App\Models\Student;
use App\Models\User;
use Barryvdh\DomPDF\PDF;
use Dompdf\Dompdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AuthenticatorController extends Controller
{
    //
    public function register(Request $request)
    {
        $rules = [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ];

        $messages = [
            'name.required' => 'Este campo es obligatorio',
            'email.required' => 'Este campo es obligatorio',
            'password.required' => 'Este campo es obligatorio',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Faltan campos obligatorios o tienen errores',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $data = $validator->validated();

            $userExists = User::where('email', '=', $data['email'])->exists();
            if ($userExists) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Este correo ya se encuentra registrado',
                ]);
            }

            $newUser = new User();
            $newUser->name = $data['name'];
            $newUser->email = $data['email'];
            $newUser->password = $data['password'];

            $newUser->save();

            $newStudent = new Student();
            $newStudent->user_id = $newUser->id;
            $newStudent->save();

            if (Auth::attempt(['email' => $data['email'], 'password' => $data['password']])) {
                $user = Auth::user();
                $token = $user->createToken('auth_token')->plainTextToken;

                Mail::to($user)->send(new RegisterMail($user));

                return response()->json([
                    'status' => 'success',
                    'message' => 'Se ha creado un nuevo usuario',
                    'token' => $token,
                    'user' => $user
                ]);
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'No se pudo iniciar sesion',
                ]);
            }

        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }


    public function login(Request $request)
    {
        $rules = [
            'email' => 'required|email',
            'password' => 'required',
        ];

        $messages = [
            'email.required' => 'Este campo es obligatorio',
            'email.email' => 'Este campo debe ser un email',
            'password.required' => 'Este campo es obligatorio',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Faltan campos obligatorios o tienen errores',
                'errors' => $validator->errors()
            ]);
        }

        try {
            $data = $validator->validated();

            if (Auth::attempt(['email' => $data['email'], 'password' => $data['password']])) {
                $user = Auth::user();
                $token = $user->createToken('auth_token')->plainTextToken;
                return response()->json([
                    'status' => 'success',
                    'message' => 'Se ha loageado correctamente',
                    'token' => $token,
                    'user' => $user
                ]);
            }

            return response()->json([
                'status' => 'error',
                'message' => 'No se pudo iniciar sesion',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }

    public function logout()
    {
        $user = Auth::user();
        $user->tokens()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Se ha deslogeado correctamente',
        ]);
    }

    public function getAuthenticatedUser()
    {
        if (!Auth::check()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Debes inciar sesion'
            ]);
        }
        try {
            if (Auth::check()) {
                $user = Auth::user();

                $infoUser = Student::with(['user'])->where('user_id', $user->id)->first();

                Mail::to($user)->send(new UserInfoMail($infoUser));

                return response()->json([
                    'status' => 'success',
                    'message' => 'Se ha encontrado el usuario',
                    'user' => $user
                ]);
            }

        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage(),
            ]);
        }
    }

    public function setUserInfo(Request $request)
    {
        try{
            $user = Auth::user();
            $userInfo = Student::where('user_id', $user->id)->first();

            if($request->has('phone_number')){
                $userInfo->phone_number = $request->input('phone_number');
            }

            if($request->has('country_residence')){
                $userInfo->country_residence = $request->input('country_residence');
            }
            $userInfo->save();

            $userInfo = Student::with(['user'])
                ->where('user_id', $user->id)
                ->first();

            return response()->json([
                'status' => 'success',
                'message' => 'Se ha actualizado el usuario',
                'user' => $userInfo
            ]);
        }catch (\Throwable $th){
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }
}
