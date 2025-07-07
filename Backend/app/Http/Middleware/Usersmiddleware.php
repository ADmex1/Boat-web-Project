<?php

namespace App\Http\Middleware;

use Closure;

class Usersmiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    //This middleware checks if the incoming requset is from admin or not
    public function handle($request, Closure $next)
    {
        if ($request->users <> 'admin'){
            return redirect('login');
        } 
        return $next($request);
    }
}
