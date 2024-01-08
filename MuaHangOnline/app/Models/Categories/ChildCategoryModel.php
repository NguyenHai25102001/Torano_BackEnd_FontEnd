<?php

namespace App\Models\Categories;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChildCategoryModel extends Model
{
    use HasFactory;
    protected $table='child_category';
    protected $fillable=[];
    public $timestamps=false;
}
