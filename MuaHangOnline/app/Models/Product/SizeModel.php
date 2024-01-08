<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SizeModel extends Model
{
    use HasFactory;
    protected $table='sizes';
    protected $fillable=[
        'name',
        'quantity',
        'color_id',
        'product_id',
    ];


    public static function createSize($data){
        return self::create([
            'name'=>$data['name'],
            'quantity'=>$data['quantity'],
            'color_id'=>$data['color_id'],
            'product_id'=>$data['product_id']
        ]);
    }
}
