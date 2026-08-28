<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    
    public function index(Request $request): Response
    {
        /** @var User $user */
       
        
       

        return Inertia::render('dashboard');

    }


}
