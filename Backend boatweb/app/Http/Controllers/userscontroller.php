<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class UsersController extends Controller
{
    public function store(Request $request)
    {
        // Log semua request yang masuk
        \Log::info('Register request received', [
            'data' => $request->all(),
            'headers' => $request->headers->all()
        ]);

        try {
            // Validate request data
            $validatedData = $this->validate($request, [
                'username' => 'required|string|max:255|unique:users',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6|confirmed',
            ]);

            \Log::info('Validation passed', ['validated_data' => $validatedData]);

            // Create the user
            $user = User::create([
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'api_token' => Str::random(60)
            ]);

            \Log::info('User created successfully', [
                'user_id' => $user->id,
                'username' => $user->username
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Registration successful',
                'user' => $user
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Validation failed', [
                'errors' => $e->errors(),
                'request_data' => $request->all()
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            \Log::error('Registration failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all()
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Registration failed: ' . $e->getMessage(),
                'debug_message' => app()->environment('local') ? $e->getTraceAsString() : null
            ], 500);
        }
    }
}
