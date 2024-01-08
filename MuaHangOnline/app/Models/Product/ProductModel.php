<?php

namespace App\Models\Product;

use App\Models\Categories\CategoryModel;
use App\Models\Categories\ChildCategoryModel;
use App\Models\Categories\SubCategoryModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ProductModel extends Model
{
    use HasFactory;
    protected $table='products';


    protected $fillable = [
        'name',
        'code',
        'title',
        'description',
        'discount', 'price',
        'sub_category_id',
        'child_category_id','brand','category_id','status'];


    public static function createProduct($data)
    {
        return self::create([
            'name' => $data['name'],
            'code' => $data['code'],
            'title' => $data['title'],
            'brand'=>$data['brand'],
            'description' => $data['description'],
            'discount' => $data['discount']/100,
            'price' => $data['price'],
            'sub_category_id' => $data['sub_category_id'],
            'child_category_id' => $data['child_category_id'],
            'category_id' => $data['category_id'],
            'status'=>1
        ]);
    }

    public function updateProduct($data){
        $this->update([
            'name' => $data['name'],
            'code' => $data['code'],
            'title' => $data['title'],
            'brand'=>$data['brand'],
            'description' => $data['description'],
            'discount' => $data['discount']/100,
            'price' => $data['price'],
        ]);
    }

    public function deleteProduct($id){
        $this->delete();
    }

    public static function showProductDetails($id){


        $product=DB::table('products')
            ->select(
                'products.*',
//                'sizes.name as sizes',
//                'product_images.path as path'

            )
            ->join('colors','products.id','=','colors.product_id')
            ->join('sizes','colors.id','=','sizes.color_id')
            ->join('product_images','products.id','=','product_images.product_id')
            ->where('products.id','=',$id)
            ->get();
        return $product;


    }

    public function colors(){
        return $this->hasMany(ColorModel::class,'product_id','id');
    }
    public function images(){
        return $this->hasMany(ImageModel::class,'product_id','id');
    }
    public function category()
    {
        return $this->belongsTo(CategoryModel::class, 'category_id');
    }
    public function subCategory()
    {
        return $this->belongsTo(SubCategoryModel::class, 'sub_category_id');
    }
    public function childCategory()
    {
        return $this->belongsTo(ChildCategoryModel::class, 'child_category_id');
    }

    public function sizes(){
        return $this->hasMany(SizeModel::class,'product_id');
    }


}
