<?php

namespace App\Models\Order;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderModel extends Model
{
    use HasFactory;
    protected $table='orders';
    protected $fillable = ['user_id',
        'guest_cart_id',
        'total_amount',
        'order_status',
        'payment_status',
        'province_id',
        'province',
        'district_id',
        'district',
        'ward_id',
        'ward','address',
        'user_name',
        'email','phone'];


    public function orderItems(){
        return $this->hasMany(OrderItemModel::class,'order_items');
    }

    public static function createOrder($userId,$guestCartId,$total_amount,$orderStatus,
        $paymentStatus,$provinceId,$province,$districtId,$district,$wardId,$ward,$address,$userName,$email,$phone){
        return self::create(
            [
                'user_id'=>$userId,
                'guest_cart_id'=>$guestCartId,
                'total_amount'=>$total_amount,
                'order_status'=>$orderStatus,
                'payment_status'=>$paymentStatus,
                'province_id'=>$provinceId,
                'province'=>$province,
                'district_id'=>$districtId,
                'district'=>$district,
                'ward_id'=>$wardId,
                'ward'=>$ward,
                'address'=>$address,
                'user_name'=>$userName,
                'email'=>$email,
                'phone'=>$phone

            ]
        );
    }

}
