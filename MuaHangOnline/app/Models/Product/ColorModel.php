<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColorModel extends Model
{
    use HasFactory;
    protected $table='colors';
    protected $fillable=[
        'name',
        'price',
        'product_id'
    ];

    public static function createColor($data){
        return self::create([
            'name'=>$data['name'],
            'price'=>$data['price'],
            'product_id'=>$data['product_id'],
        ]);
    }

    public function sizes(){
        return $this->hasMany(SizeModel::class,'color_id');
    }
}
