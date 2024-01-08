<?php

namespace App\Models\Cart;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuestCartModel extends Model
{
    protected $table = 'guest_carts'; // Fix: use a string, not an array
    protected $fillable = [];
    public $timestamps = null;

    public static function createGuestCart()
    {
        return self::create();
    }

    public function cartItem()
    {
        return $this->hasMany(GuestCartItemModel::class, 'cart_id');
    }
}
