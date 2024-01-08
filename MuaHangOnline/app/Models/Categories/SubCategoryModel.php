<?php

namespace App\Models\Categories;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategoryModel extends Model
{
    use HasFactory;
    protected $table='sub_category';
    protected $fillable=[];
    public $timestamps=false;
    public function childCategories(){
        return $this->hasMany(ChildCategoryModel::class,'sub_category_id');
    }
}
