<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImageModel extends Model
{
    use HasFactory;
    protected $table = 'product_images';
    protected $fillable = ['path', 'product_id'];

    public static function createProImage($data)
    {
        return self::create([
            'path' => $data['path'],
            'product_id' => $data['product_id'],
        ]);
    }
}
