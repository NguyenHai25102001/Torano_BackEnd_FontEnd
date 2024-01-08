<?php

namespace App\Models\Cart;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItemModel extends Model
{
    use HasFactory;
    protected $table='cart_items';
    protected $fillable=['cart_id','product_id','quantity','color_id','color_name','size_id','size_name'];
    public $timestamps=null;

    public static function createCartItem($cartId,$productId,$quantity,$colorId,$colorName,$sizeId,$sizeName){
        return self::create([
            'cart_id'=>$cartId,
            'product_id'=>$productId,
            'quantity'=>$quantity,
            'color_id'=>$colorId,
            'color_name'=>$colorName,
            'size_id'=>$sizeId,
            'size_name'=>$sizeName
        ]);
    }

    public function deleteCartItem(){
        return $this->delete();
    }

}
