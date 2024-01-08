<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BannerModel extends Model
{
    use HasFactory;
    protected $table='banners';

    protected $fillable=[
        'path','status'
    ];

    public static function createBanner($path){
        return self::create([
            'path' => $path,
            'status' => 1
        ]);
    }



}
