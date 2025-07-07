<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        \Log::info('Register attempt', $request->all());

        $this->validate($request, [
            'username' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6'
        ]);

        try {
            $user = User::create([
                'username' => $request->input('username'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'api_token' => Str::random(60)
            ]);

            \Log::info('User registered:', ['user' => $user->email]);

            return response()->json([
                'status' => 'success',
                'message' => 'User registered successfully',
                'user' => $user,
                'token' => $user->api_token
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Register error:', ['error' => $e->getMessage()]);
            
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        try {
            // Debug: Log email yang dicoba login
            \Log::info('Login attempt for email: ' . $request->input('email'));

            $user = User::where('email', $request->input('email'))->first();
            
            // Debug: Log hasil pencarian user
            \Log::info('User found in database: ' . ($user ? 'Yes' : 'No'));

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'User not found'
                ], 401);
            }

            // Debug: Log password check
            \Log::info('Password check result: ' . (Hash::check($request->input('password'), $user->password) ? 'Match' : 'No Match'));

            if (!Hash::check($request->input('password'), $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid password'
                ], 401);
            }

            // Generate new token
            $user->api_token = Str::random(60);
            $user->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Login successful',
                'user' => $user,
                'token' => $user->api_token
            ]);
        } catch (\Exception $e) {
            \Log::error('Login error: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function profile(Request $request)
    {
        return response()->json([
            'success' => true,
            'user' => $request->user()
        ]);
    }
}