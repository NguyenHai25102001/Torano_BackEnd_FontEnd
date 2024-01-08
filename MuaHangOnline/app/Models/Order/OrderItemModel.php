<?php

namespace App\Models\Order;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItemModel extends Model
{
    use HasFactory;
    protected $table='order_items';
    protected $fillable=['order_id','product_id','quantity','subtotal','color_name','size_name'];
    public $timestamps=null;

    public static function createOrderItem($orderId,$productId,$quantity,$subtotal,$colorName,$sizeName){
        return self::create([
            'order_id'=>$orderId,
            'product_id'=>$productId,
            'quantity'=>$quantity,
            'subtotal'=>$subtotal,
            'color_name'=>$colorName,
            'size_name'=>$sizeName
        ]);
    }
}
