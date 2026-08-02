<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Shop extends Model
{
    //

    protected $fillable = ['name', 'till_number', 'location', 'currency', 'passkey'];


    public function user():BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function staffMembers():HasMany{
        return $this->hasMany(User::class, 'user_id');
    }
}
