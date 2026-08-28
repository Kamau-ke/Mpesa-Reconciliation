<?php

namespace Database\Factories;

use App\Models\Shop;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Shop>
 */
class ShopFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'name' => fake()->company(),
            'user_id' => User::factory(),
            'till_number' => fake()->numerify('######'),
            'passkey' => fake()->sha256(),
            'location' => fake()->city(),
            'currency' => 'KES',

        ];
    }
}
