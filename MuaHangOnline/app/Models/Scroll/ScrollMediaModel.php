<?php

namespace App\Models\Scroll;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScrollMediaModel extends Model
{
    use HasFactory;
    protected $table='scroll_media';
    protected $fillable=[
        'scroll_product_id','type','file_path'
    ];
}
