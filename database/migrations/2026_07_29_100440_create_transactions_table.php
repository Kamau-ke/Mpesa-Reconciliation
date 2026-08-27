<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_id')->constrained('shops');
            $table->string('merchant_request_id');
            $table->string('checkout_request_id');
            $table->string('mpesa_receipt_number');
            $table->decimal('amount', 10,2);
            $table->string('phone_number');
            $table->timestamp('transaction_date');
            $table->enum('status', ['pending', 'success', 'failed', 'cancelled'])->default('success');
            $table->integer('result_code');
            $table->string('result_desc');
            $table->json('raw_payload')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
