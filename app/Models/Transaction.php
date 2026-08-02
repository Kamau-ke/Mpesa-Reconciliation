<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    //

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
}
