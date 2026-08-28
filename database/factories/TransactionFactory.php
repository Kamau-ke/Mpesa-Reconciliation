<?php

namespace Database\Factories;

use App\Models\Shop;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = fake()->randomElement(['pending', 'success', 'failed', 'cancelled']);

        return [
            //
            'shop_id' => Shop::factory(),
            'merchant_request_id' => fake()->uuid(),
            'checkout_request_id' => 'ws_CO_' . fake()->numerify('####################'),
            'mpesa_receipt_number' => strtoupper(fake()->bothify('??#######')),
            'amount' => fake()->randomFloat(2, 50, 5000),
            'phone_number' => '2547' . fake()->numerify('########'),
            'transaction_date' => fake()->dateTimeBetween('-6 months', 'now'),
            'status' => $status,
            'result_code' => $status === 'success' ? 0 : fake()->randomElement([1, 1032, 1037, 2001]),
            'result_desc' => match ($status) {
                'success' => 'The service request is processed successfully.',
                'cancelled' => 'Request cancelled by user.',
                'failed' => 'The balance is insufficient for the transaction.',
                'pending' => 'The service request has been accepted for processing.',
            },
            'raw_payload' => null,
        ];
    }
}
