<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            Log::error('User not authenticated');
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $data = $request->only(['username', 'full_name', 'email', 'facebook_id']);
        Log::info('Profile data to update:', $data);

        $user->update($data);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user,
        ]);
    }

    public function show(Request $request)
    {
        $user = Auth::user();
        return response()->json([
            'username' => $user->username,
            'full_name' => $user->full_name,
            'email' => $user->email,
            'facebook_id' => $user->facebook_id,
        ]);
    }

    public function index()
    {
        $profileData = [
            'email' => 'testuser@example.com',
            'password' => 'password123'
        ];

        return response()->json($profileData);
    }
}
