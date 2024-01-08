<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product\ColorModel;
use App\Models\Product\ImageModel;
use App\Models\Product\ProductModel;
use App\Models\Product\SizeModel;
use Dflydev\DotAccessData\Data;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Mockery\Exception;
class ProductController extends Controller
{

    public function index(Request $request)
    {
        try {
            $products = DB::table('products')
                ->select('products.id', 'products.code', 'products.name', 'products.price',
                    'products.category_id', 'products.child_category_id', 'products.sub_category_id','products.status','products.discount',
                    DB::raw('SUM(sizes.quantity) as total_quantity'))
                ->leftJoin('sizes', 'products.id', '=', 'sizes.product_id')
                ->when($request->input('category'), function ($query, $category) {
                    return $query->where('category_id', $category);
                })
                ->when($request->input('childCategory'), function ($query, $childCategory) {
                    return $query->where('child_category_id', $childCategory);
                })
                ->when($request->input('subcategory'), function ($query, $subcategory) {
                    return $query->where('sub_category_id', $subcategory);
                })
                ->when($request->filled('min_price'), function ($query) use ($request) {
                    return $query->where('products.price', '>=', $request->input('min_price'));
                })
                ->when($request->filled('max_price'), function ($query) use ($request) {
                    return $query->where('products.price', '<=', $request->input('max_price'));
                })->when($request->filled('search'),function ($query) use ($request){
                    return $query->where('products.name','like','%'.$request->input('search').'%');
                })
//                ->where('products.status','=','1')
                ->groupBy('products.id', 'products.code', 'products.name', 'products.price','products.discount');

            if ($request->input('filter') === 'nameDesc') {
                $products->orderBy('products.name', 'desc');
            } else if ($request->input('filter') === 'nameAsc') {
                $products->orderBy('products.name', 'asc');
            }else if ($request->input('filter') === 'priceAsc') {
                $products->orderBy('products.price', 'asc');
            }else if ($request->input('filter') === 'priceDesc') {
                $products->orderBy('products.price', 'desc');
            }


            $products = $products->paginate(10);



            return response()->json([
                'status' => true,
                'data' => $products,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'error' => 'Lỗi khi lấy danh sách sản phẩm'
            ],500);
        }
    }


    public function create(StoreProductRequest $request)
    {
        DB::beginTransaction();

        try {
            $data = [
                'name' => $request->input('name'),
                'code' => $request->input('code'),
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'discount' =>  $request->input('discount'),
                'price' => $request->input('price'),
                'sub_category_id' => $request->input('sub_category_id'),
                'child_category_id' => $request->input('child_category_id'),
                'category_id' => $request->input('category_id'),
                'brand' => 'Torano',
            ];

             $product = ProductModel::createProduct($data);

             $this->processColorsAndSize($request,$product);

             $this->uploadImages($request,$product);

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Thêm sản phẩm thành công',
            ]);

        } catch (Exception $exception) {
            DB::rollBack();

            return response()->json([
                'status' => false,
                'error' => 'Có lỗi trong quá trình thêm sản phẩm',
            ], 500);
        }
    }

    public function showProductDetails($id){
        try {
            $product = ProductModel::with([
                'colors' => function ($query) {
                    $query->select('id', 'name', 'product_id');
                },
                'colors.sizes' => function ($query) {
                    $query->select('id', 'name', 'color_id', 'product_id','quantity');
                },
                'images' => function ($query) {
                    $query->select('id', 'path', 'product_id');
                },
                'category' => function ($query) {
                    $query->select('id', 'name');
                },
                'subCategory' => function ($query) {
                    $query->select('id', 'name');
                },
                'childCategory' => function ($query) {
                    $query->select( 'id','name');
                }
            ])->find($id);

            if (!$product) {
                return response()->json([
                    'status' => false,
                    'error' => 'Sản phẩm không tồn tại'
                ]);
            }


            return response()->json([
                'status' => true,
                'data' => $product,
            ]);

        }catch (\Exception $exception){

            return response()->json([
                'status'=>false,
                'error'=>'Có lỗi trong quá trình'
            ],500);
        }

    }

    public function edit(UpdateProductRequest $request,$id){
        DB::beginTransaction();
        try {

            $product=ProductModel::find($id);
            if(!$product){
                return response()->json([
                    'status'=>false,
                    'error'=>'Sản phẩm không tồn tại'
                ],404);
            }
            $product-> updateProduct([
                'name' => $request->input('name'),
                'code' => $request->input('code'),
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'discount' => $request->input('discount'),
                'price' => $request->input('price'),
                'brand' => 'Torano',
            ]);


         $this->processColorsAndSize($request,$product);

            $this->deleteColors($request);

            $this->deleteSizes($request);

            $this->uploadImages($request,$product);

           $this->deleteImages($request);

            DB::commit();

            return response()->json([
                'status'=>true,
                'error'=>'Cập nhật thành công',
            ]);

        }catch (Exception $exception){
            DB::rollBack();
            return response()->json([
                'status'=>false,
                'error'=>'Có lỗi trong quá  trình sửa'
            ],500);

        }

    }

    public function delete($id) {
        try {
            $product = ProductModel::find($id);

            if (!$product) {
                return response()->json([
                    'status' => false,
                    'error' => 'Sản phẩm không tồn tại'
                ], 404);
            }

            $product->delete();

            return response()->json([
                'status' => true,
                'message' => 'Xoá sản phẩm thành công'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'error' => 'Lỗi khi xoá sản phẩm: ' . $e->getMessage()
            ], 500);
        }
    }


    public function changeProductStatus($id){
        try {
            $product=ProductModel::find($id);
            if(!$product){
                return response()->json([
                    'status' => false,
                    'error' => 'Sản phẩm không tồn tại'
                ], 404);
            }

            $status=$product->status;
            if($status===1){
                $product->status=0;
            }
            if($status===0){
                $product->status=1;
            }
            $product->save();
            return response()->json([
                'status' => true,
                'message' => 'Thay đổi trạng thái thành công.'
            ], 200);

        }catch (Exception $exception){

            return response()->json([
                'status' => false,
                'error' => 'Lỗi thay đổi trạng thái sản phẩm.'.$exception->getMessage()
            ], 500);
        }

    }


    private function uploadImages($request ,ProductModel $product){
        $fileImages = $request->file('files');

        if (is_array($fileImages) && count($fileImages) > 0) {
            foreach ($fileImages as $fileImage) {
                $dataImage = [
                    'path' => $this->fileNamePath($fileImage, 'product/'.$product->code),
                    'product_id' => $product->id,
                ];
                $productImage = ImageModel::createProImage($dataImage);
                $productImage->save();
            }
        }else {
            return response()->json([
                'status'=>false,
                'error'=>'Bạn chưa chọn ảnh'
            ],500);
        }
    }

    private function processColorsAndSize($request,ProductModel $product){

        $colors = $request->get('colors');

        if (is_array($colors) && count($colors) > 0) {
            foreach ($colors as $valueColor) {
                $color = $this->createOrUpdateColors($valueColor, $product);

                $sizes = $valueColor['sizes'];

                $this->createOrUpdateSizes($sizes,$color,$product);
            }
        }

    }

    private function createOrUpdateColors($valueColor,ProductModel $product){
        $colorId = $valueColor['id'];
        $color = ColorModel::find($colorId);
        if(!$color){
            $color=new ColorModel();
        }
        $color->name = $valueColor['name'];
        $color->price = $product->price;
        $color->product_id = $product->id;
        $color->save();

         return $color;

    }

    private function createOrUpdateSizes($sizes,ColorModel $color,ProductModel $product){
        foreach ($sizes as $valueSize) {
            $sizeId = $valueSize['id'];
            $size = SizeModel::find($sizeId) ?? new SizeModel();
            $size->name = $valueSize['name'];
            $size->quantity = $valueSize['quantity'];
            $size->color_id = $color->id;
            $size->product_id = $product->id;
            $size->save();

        }

    }

    private function deleteColors($request){
        $deleteColor=$request->get('deleteColor');
        if(is_array($deleteColor)&& count($deleteColor)>0){
            foreach ($deleteColor as $colorId){
                $color=ColorModel::find($colorId);
                if ($color){
                    $color->delete();
                }
            }
        }
    }

    private function deleteSizes($request){
        $deleteSize=$request->get('deleteSize');
        if(is_array($deleteSize)&& count($deleteSize)>0){
            foreach ($deleteSize as $sizeId){
                $size=SizeModel::find($sizeId);
                if ($size){
                    $size->delete();
                }
            }
        }
    }

    private function deleteImages($request){
        $deleteImage=$request->get('deleteImage');
        if(is_array($deleteImage)&& count($deleteImage)>0){
            foreach ($deleteImage as $fileId){
                $file=ImageModel::find($fileId);
                if ($file){
                    Storage::disk('public')->delete($file->path);
                    $file->delete();
                }
            }
        }
    }

}
