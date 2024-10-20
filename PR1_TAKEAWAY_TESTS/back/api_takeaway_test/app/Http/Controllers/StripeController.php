<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StripeController extends Controller
{
    //
    public function createSetupIntent()
    {
        $user = Auth::user();

        // Si el usuario no tiene un Stripe ID, lo crea
        if (!$user->hasStripeId()) {
            $user->createAsStripeCustomer();
        }

        // Creación del SetupIntent
        $intent = $user->createSetupIntent();

        // Devolver el client_secret del SetupIntent
        return response()->json([
            'client_secret' => $intent->client_secret
        ]);
    }


    public function addPaymentMethod(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user->hasStripeId()) {
                $user->createAsStripeCustomer();
            }

            $user->addPaymentMethod($request->paymentMethod);

            return response()->json(['status' => 'success', 'message' => 'Payment Method added successfully!', 'user' => $user]);

        } catch (\Exception $e) {
            // Registrar el error para poder inspeccionarlo
            \Log::error('Error adding payment method: ' . $e->getMessage());

            return response()->json(['status' => 'error', 'message' => 'Failed to add payment method'], 500);
        }
    }

}
