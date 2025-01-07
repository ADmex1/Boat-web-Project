<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
*/

require_once __DIR__.'/../vendor/autoload.php';

try {
    $app = require __DIR__.'/../bootstrap/app.php';

    /*
    |--------------------------------------------------------------------------
    | Run The Application
    |--------------------------------------------------------------------------
    */

    $app->run();
} catch (\Exception $e) {
    echo "<pre>";
    echo "Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . "\n";
    echo "Line: " . $e->getLine() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString();
    echo "</pre>";
    die();
}
