<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EmployeeManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_owner_can_create_an_employee_for_their_shop(): void
    {
        $owner = User::factory()->create(['role' => 'owner']);
        $shop = $owner->ownedShops()->create([
            'name' => 'Owner Shop',
            'till_number' => '123456',
            'passkey' => 'passkey',
        ]);

        $response = $this->actingAs($owner)->post(route('employees.store'), [
            'name' => 'Jane Employee',
            'email' => 'jane@example.test',
            'phone' => '+254700000000',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertSessionHasNoErrors();
        $this->assertDatabaseHas('users', [
            'email' => 'jane@example.test',
            'phone' => '+254700000000',
            'role' => 'staff',
            'status' => 'active',
            'shop_id' => $shop->id,
        ]);
    }

    public function test_owner_can_remove_only_an_employee_from_their_shop(): void
    {
        $owner = User::factory()->create(['role' => 'owner']);
        $shop = $owner->ownedShops()->create([
            'name' => 'Owner Shop',
            'till_number' => '123456',
            'passkey' => 'passkey',
        ]);
        $employee = User::factory()->create(['shop_id' => $shop->id, 'role' => 'staff']);

        $this->actingAs($owner)->delete(route('employees.destroy', $employee))->assertRedirect();

        $this->assertDatabaseMissing('users', ['id' => $employee->id]);
    }

    public function test_staff_cannot_manage_employees(): void
    {
        $staff = User::factory()->create(['role' => 'staff']);

        $this->actingAs($staff)->post(route('employees.store'), [
            'name' => 'Jane Employee',
            'email' => 'jane@example.test',
            'phone' => '+254700000000',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ])->assertForbidden();
    }

    public function test_owner_cannot_remove_an_employee_from_another_shop(): void
    {
        $owner = User::factory()->create(['role' => 'owner']);
        $otherOwner = User::factory()->create(['role' => 'owner']);
        $owner->ownedShops()->create([
            'name' => 'Owner Shop',
            'till_number' => '123456',
            'passkey' => 'owner-passkey',
        ]);
        $otherShop = $otherOwner->ownedShops()->create([
            'name' => 'Other Shop',
            'till_number' => '654321',
            'passkey' => 'other-passkey',
        ]);
        $employee = User::factory()->create(['shop_id' => $otherShop->id, 'role' => 'staff']);

        $this->actingAs($owner)
            ->delete(route('employees.destroy', $employee))
            ->assertNotFound();

        $this->assertDatabaseHas('users', ['id' => $employee->id]);
    }
}
