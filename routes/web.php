<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MenuController;

Route::inertia('/', 'Home')->name('home');
Route::get('/our-menu', [MenuController::class, 'index'])->name('menu');
Route::inertia('/about', 'About')->name('about');
Route::inertia('/locations', 'Locations')->name('locations');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
