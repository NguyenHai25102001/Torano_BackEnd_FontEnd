<?php

namespace App\Models\Cart;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartModel extends Model
{
    use HasFactory;
    protected $table='carts';
    protected $fillable=['user_id'];

    public $timestamps=null;

    public static function createCart($userId){
        return self::create([
            'user_id' => $userId
        ]);
    }


    public function cartItem(){
        return $this->hasMany(CartItemModel::class,'cart_id');
    }


}
