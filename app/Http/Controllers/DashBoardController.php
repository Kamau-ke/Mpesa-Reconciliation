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
    /**
     * Render the authenticated dashboard.
     *
     * All monetary totals are computed here, server-side — the frontend
     * never sums raw transaction amounts itself (project rule §4.2).
     * Amounts are integers throughout (project rule §4.4 — no floats).
     */
    public function index(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();

        // Resolve the shop this user can see data for.
        // Owners: their own shop. Staff: their assigned shop.
        // $shop = $user->isOwner()
        //     ? $user->ownedShops()->first()
        //     : $user->assignedShop;

        // No shop set up yet — dashboard still loads, just with empty state.
        // if (! $shop) {
        //     return Inertia::render('dashboard', [
        //         'shop'        => null,
        //         'todayTotal'  => 0,
        //         'weekTotal'   => 0,
        //         'monthTotal'  => 0,
        //         'txnCount'    => 0,
        //         'avgSale'     => 0,
        //         'flagged'     => 0,
        //         'yesterday'   => 0,
        //         'transactions' => [],
        //         'staff'       => [],
        //         'isOwner'     => $user->isOwner(),
        //     ]);
        // }

        // $today     = Carbon::today();
        // $yesterday = Carbon::yesterday();
        // $weekStart = Carbon::now()->startOfWeek();
        // $monthStart = Carbon::now()->startOfMonth();

        // // All totals via a single query grouping by date window.
        // // SUM on integer column — safe, no float involved.
        // $totals = Transaction::where('shop_id', $shop->id)
        //     ->where('status', 'paid')
        //     ->selectRaw("
        //         SUM(CASE WHEN DATE(transaction_date) = ? THEN amount ELSE 0 END) AS today_total,
        //         SUM(CASE WHEN DATE(transaction_date) = ? THEN amount ELSE 0 END) AS yesterday_total,
        //         SUM(CASE WHEN transaction_date >= ?       THEN amount ELSE 0 END) AS week_total,
        //         SUM(CASE WHEN transaction_date >= ?       THEN amount ELSE 0 END) AS month_total,
        //         COUNT(CASE WHEN DATE(transaction_date) = ? THEN 1 END)           AS today_count,
        //         COUNT(CASE WHEN DATE(transaction_date) = ? THEN 1 END)           AS today_paid_count
        //     ", [
        //         $today->toDateString(),
        //         $yesterday->toDateString(),
        //         $weekStart,
        //         $monthStart,
        //         $today->toDateString(),
        //         $today->toDateString(),
        //     ])
        //     ->first();

        // $todayTotal = (int) ($totals->today_total ?? 0);
        // $todayCount = (int) ($totals->today_count ?? 0);
        // $avgSale    = $todayCount > 0 ? (int) round($todayTotal / $todayCount) : 0;

        // $flagged = Transaction::where('shop_id', $shop->id)
        //     ->where('status', 'flagged')
        //     ->whereDate('transaction_date', $today)
        //     ->count();

        // // Last 50 transactions for today, newest first.
        // $transactions = Transaction::where('shop_id', $shop->id)
        //     ->whereDate('transaction_date', $today)
        //     ->orderByDesc('transaction_date')
        //     ->limit(50)
        //     ->get()
        //     ->map(fn (Transaction $t) => [
        //         'id'     => $t->mpesa_receipt_number,
        //         'time'   => Carbon::parse($t->transaction_date)->format('H:i'),
        //         'payer'  => $t->payer_phone,
        //         'amount' => (int) $t->amount,   // integer, always
        //         'status' => $t->status,
        //     ]);

        // // Staff list — owner only, never exposed to staff role.
        // $staff = [];
        // if ($user->isOwner()) {
        //     $staff = User::where('shop_id', $shop->id)
        //         ->where('role', 'staff')
        //         ->orderBy('created_at')
        //         ->get()
        //         ->map(fn (User $u) => [
        //             'id'          => $u->id,
        //             'name'        => $u->name,
        //             'email'       => $u->email,
        //             'status'      => $u->status,
        //             'addedOn'     => Carbon::parse($u->created_at)->format('d M'),
        //         ]);
        // }

        $shop = $user->isOwner()
            ? $user->ownedShops()->first()
            : $user->assignedShop;

        $staff = $user->isOwner() && $shop
            ? $shop->staffMembers()
                ->where('role', 'staff')
                ->oldest()
                ->get()
                ->map(fn (User $staffMember) => [
                    'id' => $staffMember->id,
                    'name' => $staffMember->name,
                    'email' => $staffMember->email,
                    'status' => $staffMember->status,
                    'addedOn' => $staffMember->created_at?->format('d M Y'),
                ])
            : [];

        return Inertia::render('dashboard', [
            'shop'         => [
                'id'         => 1,
                'name'       =>'Maguna',
                'tillNumber' => 445567,
                'location'   => 'Kenol',
                'currency'   => 'KES',
            ],
            'todayTotal'   => 30000,
            'yesterdayTotal' => 32000,
            'weekTotal'    => 150000,
            'monthTotal'   => 10000000,
            'txnCount'     => 20,
            'avgSale'      => 300000,
            'flagged'      => 4,
            'transactions' => 30,
            'staff'        => $staff,
            'isOwner'      => $user->isOwner(),
        ]);
    }
}
