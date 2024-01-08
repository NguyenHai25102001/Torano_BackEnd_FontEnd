<?php

namespace App\Models\Categories;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryModel extends Model
{
    use HasFactory;
    protected $table='category';
    protected $fillable=[];
    public $timestamps=false;

    public function subcategories(){
        return $this->hasMany(SubCategoryModel::class,'category_id');
    }
}
