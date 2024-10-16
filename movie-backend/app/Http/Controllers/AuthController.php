<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        \Log::info('Login request received', ['email' => $request->email]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            \Log::warning('Invalid user information', ['email' => $request->email]);
            return response()->json(['error' => 'Invalid user information'], 401);
        }

        Auth::login($user);
        $token = $user->createToken('API Token')->plainTextToken;

        \Log::info('User logged in', [
            'email' => $request->email, 
            'token' => $token,
            'user' => $user
        ]);

        return response()->json(['token' => $token, 'user' => $user], 200);
    }
}
