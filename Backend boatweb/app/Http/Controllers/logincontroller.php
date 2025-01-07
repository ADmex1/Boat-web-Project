<?php
//Decrapted
namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\str;
class logincontroller extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }
    public function register(Request $request){
        $data=[
           'email' =>  $request->input('email'),
            'password' => $request->input('password'),
            'api_token' => '05041945555',
            'Role' => 'admin',
        ];
        User::create($data);
        return response()->json($data);
    }
    public function login(Request $request){
        $email = $request->input('email');  
        $password = $request->input('password');
        $user = User::where('email', $email)->first();

        if($user->password == $password){
           $token = Str::random(60);

           $user->update([
                'api_token' => $token
           ]);
           return response()->json([
               'message' => 'Login successful',
               'token' => $token,
               'data' => $user
           ]);
        }else{
            return response()->json([
                'message' => 'Login failed',
                'data' => 'Empty'
            ]);
        }
    }
}
