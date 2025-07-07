<?php

/** @var \Laravel\Lumen\Routing\Router $router */
//This is the route file for the application
$router->get('/', function () {
    return response()->json(['message' => 'Welcome to our boat API']);
});
//This is the route for the boats
$router->group(['prefix' => 'api'], function () use ($router) {
    // Auth Routes
    $router->post('register', 'UsersController@store');
    $router->post('login', 'AuthController@login');
    
    // Public Boat Routes
    $router->get('boats', 'BoatController@index');
    $router->get('boats/{id}', 'BoatController@show');
    
    // Protected Routes
    $router->group(['middleware' => 'auth'], function () use ($router) {
        // Reviews
        $router->get('reviews', 'ReviewController@index');
        $router->post('reviews', 'ReviewController@store');
        $router->put('reviews/{id}', 'ReviewController@update');
        $router->delete('reviews/{id}', 'ReviewController@destroy');
    });
});

$router->group(['prefix' => 'api'], function () use ($router) {
    // Public route untuk get reviews
    $router->get('boats/{boatId}/reviews', 'ReviewController@index');

    // Protected routes yang membutuhkan auth
    $router->group(['middleware' => 'auth'], function () use ($router) {
        $router->post('boats/{boatId}/reviews', 'ReviewController@store');
        $router->put('reviews/{id}', 'ReviewController@update');
        $router->delete('reviews/{id}', 'ReviewController@destroy');
    });
});

    
