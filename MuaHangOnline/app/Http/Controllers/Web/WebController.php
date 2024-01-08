<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Categories\CategoryModel;
use App\Models\Product\ProductModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Mockery\Exception;

class WebController extends Controller
{
    public function categoriesList(){
        try {
            $categoryList=CategoryModel::with('subcategories.childCategories')->get();

            return response()->json([
                'status' => true,
                'categories' => $categoryList
            ],200);

        }catch (Exception $exception){
            return response()->json([
                'status' => false,
                'error' => 'Lỗi khi lấy danh sách danh mục'
            ],500);
        }

    }

    public function productList(Request $request,$code){
        try {
            $products =ProductModel::join('category', 'category.id', '=', 'products.category_id')
                ->join('sub_category', 'sub_category.id', '=', 'products.sub_category_id')
                ->join('child_category', 'child_category.id', '=', 'products.child_category_id')
                ->join('sizes', 'sizes.product_id', '=', 'products.id')
                ->leftJoin('colors', 'colors.product_id', '=', 'products.id')
                ->orWhere('category.code', '=', $code)
                ->orWhere('sub_category.code', '=', $code)
                ->orWhere('child_category.code', '=', $code)
                ->select('products.id', 'products.name', 'products.price','products.discount')
                ->selectRaw('COUNT(DISTINCT colors.id) as color_count')
                ->groupBy('products.id', 'products.name', 'products.price');

            $filter = $request->input('filter');
            if ($filter === 'nameDesc') {
                $products->orderBy('products.name', 'desc');
            } else if ($filter === 'nameAsc') {
                $products->orderBy('products.name', 'asc');
            } else if ($filter === 'priceAsc') {
                $products->orderBy('products.price', 'asc');
            } else if ($filter === 'priceDesc') {
                $products->orderBy('products.price', 'desc');
            }

            $products = $products->with('images')->paginate(16);

            $category = DB::table('category')->where('code', '=', $code)->first();
            $subcategory = DB::table('sub_category')->where('code', '=', $code)->first();
            $childCategory = DB::table('child_category')->where('code', '=', $code)->first();

            $nameCategory = '';

            if ($childCategory) {
                $nameCategory = $childCategory->name;
            } else if ($subcategory) {
                $nameCategory = $subcategory->name;
            } else if ($category) {
                $nameCategory = $category->name;
            }

            return response()->json([
                'status' => true,
                'nameCategory' => $nameCategory,
                'data' => $products,
            ], 200);


        }catch (Exception $exception){
            return response()->json([
                'status' => false,
                'error' => 'Lỗi khi lấy danh sách sản phẩm'
            ],500);
        }
    }

    public function productDetails($id){
        try {

            $product = ProductModel::with('colors.sizes','images')->find($id);


            if(!$product){
                return response()->json([
                    'status' => false,
                    'error' => 'Sản phẩm không tồn tại'
                ],404);
            }

            return response()->json([
                'status' => true,
                'product' =>$product,
            ],200);

        } catch(\Exception $exception){
            return response()->json([
                'status' => false,
                'error' => 'Lỗi lấy sản phẩm chi tiết'
            ],500);
        }
    }

    public function collectionProductSale()
    {
        try {
            $productSales = ProductModel::
                with('images')
            ->where('discount', '>', 0)
                ->inRandomOrder()
                ->take(20)->get();

            return response()->json([
                'status' => true,
                'data' => $productSales,
            ], 200);
        } catch (\Exception $exception) {
            return response()->json([
                'status' => false,
                'error' => 'Có lôi xảy ra!',
            ], 500);
        }
    }

    public function collectionProduct(Request$request)
    {
        try {
            $subcategories = $request->get('subcategories');

            $allProductSales = [];
            if (is_array($subcategories)) {
                foreach ($subcategories as $subcaphptegory) {
                    $productSales = ProductModel::
                    with('images')
                        ->where('sub_category_id', '=', $subcategory)
                        ->inRandomOrder()
                        ->take(12)
                        ->get();
                    $allProductSales = array_merge($allProductSales, $productSales->toArray());
                }
            }


            return response()->json([
                'status' => true,
                'data' => $allProductSales,
            ], 200);
        } catch (\Exception $exception) {
            return response()->json([
                'status' => false,
                'error' => 'Có lôi xảy ra!',
            ], 500);
        }

    }

    public function collectionCategory(Request $request){
        try {
            $dataSubcategories = $request->get('subcategories');
            $data=[];
            foreach ($dataSubcategories as $subcategory) {
                $subcategories = DB::table('sub_category')
                      ->where('code', $subcategory)->get();
                $data=array_merge($data,$subcategories->toArray());
            }

            return response()->json([
                'status' => true,
                'subcategories' => $data,
            ], 200);
        }catch (\Exception $exception){
            return response()->json([
                'status' => false,
                'error' => 'Có lôi xảy ra!',
            ], 500);
        }
    }

}
