<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ShopController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/staff', [EmployeeController::class,'index']);

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::inertia('dashboard', 'dashboard')->name('dashboard');
// });

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/employees', [EmployeeController::class, 'store'])->name('employees.store');
    Route::delete('/employees/{employee}', [EmployeeController::class, 'destroy'])->name('employees.destroy');

    Route::get('/shop/{shopId}/transactions', [ShopController::class, 'showTransactions'])->name('showTransactions');
});

require __DIR__.'/settings.php';
