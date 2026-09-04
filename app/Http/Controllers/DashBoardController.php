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
       
        
     $latestTransactions = auth()->user()->transactions()
    ->with('shop')
    ->latest()
    ->take(10)
    ->get()
    ->map(fn ($t) => [
        'id' => $t->id,
        'mpesa_receipt_number' => $t->mpesa_receipt_number,
        'mpesaReceipt' => $t->mpesaReceipt,
        'phone_number' => $t->phone_number,
        'sender_name' => $t->sender_name,
        'amount' => $t->amount,
        'status' => $t->status,
        'time' => $t->created_at->format('h:i A'),
        'shop_name' => $t->shop->name,
        'till_number' => $t->shop->till_number,
    ]);

       $sumOfAllTransactions=auth()->user()->transactions()->sum('amount');
       $sumOfTodayTransactions=auth()->user()->transactions()->whereDate('transactions.created_at', today())->sum('amount');

    //    get daily tot transactions

    // dump(auth()->user());
    // return latest transaction and sum to dashboard

        return Inertia::render('dashboard',compact('latestTransactions', 'sumOfAllTransactions', 'sumOfTodayTransactions'));

    }


}
