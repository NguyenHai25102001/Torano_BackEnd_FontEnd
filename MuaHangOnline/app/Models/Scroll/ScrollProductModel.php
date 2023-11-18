<?php

namespace App\Models\Scroll;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScrollProductModel extends Model
{
    use HasFactory;
    protected $table='scroll_products';
    protected $fillable=[
        'name','price'
    ];
    public function scrollMedia(){
        return $this->hasMany(ScrollMediaModel::class,'scroll_product_id','id');
    }

}
