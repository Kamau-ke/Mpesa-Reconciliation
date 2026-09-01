<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Transaction extends Model
{
    //

    use HasFactory;

    protected $fillable = [
        'merchant_request_id',
        'checkout_request_id',
        'mpesa_receipt_number',
        'amount',
        'phone_number',
        'transaction_date',
        'status',
        'result_code',
        'result_desc',
        'raw_payload'
    ];

    public function shop():BelongsTo{
        return $this->belongsTo(Shop::class);
    }
}
