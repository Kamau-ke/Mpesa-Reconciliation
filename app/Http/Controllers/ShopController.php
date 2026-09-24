<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;

class ShopController extends Controller
{
    //

    public function index()
    {
        return 'this is index';
    }

    public function store(Request $request)
    {
        // 'name', 'till_number', 'location', 'currency', 'passkey'

        $validated = $request->validate([
            'name' => 'required|string|min:3|max:20',
            'till_number' => 'required|min:8|max:12',
            'location' => 'required|string',
            'currency' => 'require',
            'passkey' => 'required',
        ]);

        Shop::create([
            'name' => $validated['name'],
            'till_number' => $validated['till_number'],
            'location' => $validated['location'],
            'currency' => $validated['currency'],
            'passkey' => Crypt::encryptString($validated['passkey']),
        ]);
    }

    public function show(Shop $shop)
    {
        $activeShopId = $shop->id;
        $latestTransactions = $shop->transactions()->latest()->take(10)->get();
        $sumOfAllTransactions = $shop->transactions()->sum('amount');
        $sumOfTodayTransactions = $shop->transactions()->whereDate('created_at', Carbon::now())->sum('amount');
        $shops = auth()->user()->shop()->get();

        return Inertia::render('shop', compact('shop', 'shops', 'activeShopId', 'latestTransactions', 'sumOfAllTransactions', 'sumOfTodayTransactions'));
    }

    public function edit(Shop $shop)
    {
        return 'edit shop';
    }

    public function update(Request $request, Shop $shop)
    {
        abort_unless($shop->user_id === auth()->id(), 403);

        $validated = $request->validate([
            'name' => 'required|string|min:3|max:20',
            'till_number' => 'required|string|min:5|max:10',
            'location' => 'required|string',
            'currency' => 'required|string',
            'passkey' => 'nullable|string',
        ]);

        $shop->update([
            'name' => $validated['name'],
            'till_number' => $validated['till_number'],
            'location' => $validated['location'],
            'currency' => $validated['currency'],
            'passkey' => filled($validated['passkey'])
                ? Crypt::encryptString($validated['passkey'])
                : $shop->passkey,
        ]);

        return back();
    }

    public function destroy(Shop $shop)
    {
        if (auth()->id() !== $shop->user_id) {
            abort(403);
        }

        $shop->delete();

        return 'shop deleted';
    }

  public function showTransactions(Request $request, $shopId)
{
    $activeShopId = $shopId;
    $shops = auth()->user()->shop()->get();
    $shop = auth()->user()->shop()->findOrFail($shopId);

    $filter = $request->query('filter'); // 'daily', 'weekly', 'monthly'

    if ($filter && !in_array($filter, ['today', 'week', 'all'])) {
        abort(422, 'Invalid filter');
    }

    $query = $shop->transactions()->latest();

    match ($filter) {
        'daily' => $query->whereDate('created_at', today()),
        'weekly' => $query->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]),
        'monthly' => $query->whereBetween('created_at', [now()->startOfMonth(), now()->endOfMonth()]),
        default => null,
    };

    $transactions = $filter
        ? $query->get()
        : $query->take(10)->get();

    return Inertia::render('shop-transactions', compact(
        'shop', 'transactions', 'activeShopId', 'shops', 'filter'
    ));
}

    //  get daily transactions

    public function getSum(string $period = 'daily'): float
    {
        $query = $this->showTransactions();

        return match ($period) {
            'daily' => $query->whereDate('transaction_date', today())->sum('amount'),
            'weekly' => $query->whereBetween('transaction_date', [now()->startOfWeek(), now()->endOfWeek()])->sum('amount'),
            'monthly' => $query->whereMonth('transaction_date', now()->month)->whereYear('transaction_date', now()->year)->sum('amount'),
            'yearly' => $query->whereYear('transaction_date', now()->year)->sum('amount'),
            default => throw new \InvalidArgumentException("Invalid period: {$period}"),
        };
    }
}
