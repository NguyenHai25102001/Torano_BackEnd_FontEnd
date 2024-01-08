<?php

namespace App\Models\Cart;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuestCartItemModel extends Model
{
    use HasFactory;
    protected $table='guest_cart_item';
    protected $fillable=['guest_cart_id','product_id','quantity','color_id','color_name','size_id','size_name'];
    public $timestamps=null;

    public static function createGuestCartItem($guestCartId,$productId,$quantity,$colorId,$colorName,$sizeId,$sizeName){
        return self::create([
            'guest_cart_id'=>$guestCartId,
            'product_id'=>$productId,
            'quantity'=>$quantity,
            'color_id'=>$colorId,
            'color_name'=>$colorName,
            'size_id'=>$sizeId,
            'size_name'=>$sizeName
        ]);
    }
}
