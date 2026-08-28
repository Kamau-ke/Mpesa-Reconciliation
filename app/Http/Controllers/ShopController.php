<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;

class ShopController extends Controller
{
    //

    public function store(Request $request){
       // 'name', 'till_number', 'location', 'currency', 'passkey'

       $validated=$request->validate([
        'name'=>'required|string|min:3|max:20',
        'till_number'=>'required|min:8|max:12',
        'location'=>'required|string',
        'currency'=>'require',
        'passkey'=>'required'
       ]);

       Shop::create([
        'name'=>$validated['name'],
        'till_number'=>$validated['till_number'],
        'location'=>$validated['location'],
        'currency'=>$validated['currency'],
        'passkey'=>Crypt::encryptString($validated['passkey'])
       ]);
    }

    public function edit(Shop $shop){
        return 'edit shop';
    }

    public function update(Request $request, Shop $shop){
        $validated=$request->validate([
        'name'=>'required|string|min:3|max:20',
        'till_number'=>'required|min:8|max:12',
        'location'=>'required|string',
        'currency'=>'required',
        'passkey'=>'required'
        ]);

        $shop->update([
        'name'=>$validated['name'],
        'till_number'=>$validated['till_number'],
        'location'=>$validated['location'],
        'currency'=>$validated['currency'],
        'passkey'=> filled($validated['passkey'])
            ? Crypt::encryptString($validated['passkey'])
            : $shop->passkey,
        'owner_id'=>Auth()->user()->id
        ]);
    }

      public function destroy(Shop $shop){
            if(auth()->id() !==$shop->user_id){
                abort(403);
            }

            $shop->delete();
            return 'shop deleted';
     }

     public function showTransactions($shopId){
        $shop=auth()->user()->ownedShops()->findOrFail($shopId);
        $transactions=$shop->transactions()-latest()->get();

        return 'This are the transactions available';
     }

    //  get daily transactions

    public function getSum(string $period='daily'): float {
        $query=$this->showTransactions();

        return match($period){
        'daily'   => $query->whereDate('transaction_date', today())->sum('amount'),
        'weekly'  => $query->whereBetween('transaction_date', [now()->startOfWeek(), now()->endOfWeek()])->sum('amount'),
        'monthly' => $query->whereMonth('transaction_date', now()->month)->whereYear('transaction_date', now()->year)->sum('amount'),
        'yearly'  => $query->whereYear('transaction_date', now()->year)->sum('amount'),
        default   => throw new \InvalidArgumentException("Invalid period: {$period}"),
        };
    }

     
}
