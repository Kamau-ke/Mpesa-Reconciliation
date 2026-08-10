<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class EmployeeController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $owner = $this->owner($request);
        $shop = $owner->ownedShops()->firstOrFail();

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)],
            'phone' => ['required', 'string', 'max:30'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'password' => $data['password'],
            'role' => 'staff',
            'status' => 'active',
            'shop_id' => $shop->id,
        ]);

        return back()->with('success', 'Employee created.');
    }

    public function destroy(Request $request, User $employee): RedirectResponse
    {
        $owner = $this->owner($request);
        $shop = $owner->ownedShops()->firstOrFail();

        abort_unless(
            $employee->isStaff() && $employee->shop_id === $shop->id,
            404,
        );

        DB::transaction(function () use ($employee): void {
            DB::table('sessions')->where('user_id', $employee->id)->delete();
            $employee->delete();
        });

        return back()->with('success', 'Employee removed.');
    }

    private function owner(Request $request): User
    {
        /** @var User $user */
        $user = $request->user();

        abort_unless($user->isOwner(), 403);

        return $user;
    }
}
