<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Categories\CategoryModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use mysql_xdevapi\Exception;


class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    public function index()
    {
        try {
            $categories=DB::table('category')->get();
            return response()->json(['categories'=>$categories]);

        }catch (Exception $exception){
            dd($exception->getMessage());
            return response()->json(['error'=>'Lỗi'],400);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        DB::beginTransaction();
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|unique:category',
                'image' => 'required|image',
            ], [
                'name.required' => 'Vui lòng nhập tên danh mục.',
                'image.required' => 'Vui lòng chọn ảnh',
                'image.image' => 'Tệp được chọn không phải là hình ảnh.',
                'name.unique'=>'Tên danh mục đã tồn tại'
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()->first(), 'status' => false], 400);
            }

            $image = $request->file('image');
            $category = new CategoryModel();
            $category->name = $request->input('name');
            $category->image = $this->fileName($image, 'category');
            $category->save();
            DB::commit();
            return response()->json(['message' => 'Bạn đã thêm thành công', 'status' => true], 200);
        } catch (Exception $exception) {
            return response()->json(['error' => $exception->getMessage(), 'status' => false], 400);
        }
    }

    /**
     * @param $file
     * @param $path
     * Thêm và lưu file ảnh
     * @return \Illuminate\Http\JsonResponse|string
     */

    private function fileName($file, $path)
    {
        if ($file && $file->isFile()) {
            $fileName = uniqid('', false) . '_' . $file->getClientOriginalName();
            $pathImage = $file->storeAs('public/uploads/' . $path, $fileName);
            return 'uploads/'.$path.'/'.$fileName;
        }
        return response()->json(['error' => 'Ảnh không phải là file'], 400);
    }

    /**
     * @param $id
     *           Phương thức xoá category
     *
     * @return \Illuminate\Http\JsonResponse
     *
     */

    public function delete($id){
        try {
            $category=CategoryModel::find($id);
            if(!$category){
                return response()->json(['error'=>'Danh mục không tồn tại','status'=>false],400);
            }
            $category->delete();
            return response()->json(['message'=>'success delete category','status'=>true],200);

        } catch (Exception $exception) {
            return response()->json(['error' => $exception->getMessage(), 'status' => false], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($request,$id)
    {
        try {
            $category=CategoryModel::find($id);
            if(!$category){
                $category = new CategoryModel();
            }
            $image = $request->file('image');
            $category->name = $request->input('name');
            $category->image = $this->fileName($image, 'category');
        }catch (Exception $exception) {
            return response()->json(['error' => $exception->getMessage(), 'status' => false], 400);
        }

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id,Request $request)
    {
         DB::beginTransaction();
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
//                'image' => 'required|image',
            ], [
                'name.required' => 'Vui lòng nhập tên danh mục.',
//                'image.required' => 'Vui lòng chọn ảnh',
//                'image.image' => 'Tệp được chọn không phải là hình ảnh.',
                'name.unique'=>'Tên danh mục đã tồn tại'
            ]);
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()->first(), 'status' => false], 400);
            }
            $category=CategoryModel::find($id);
            if(!$category){
                return response()->json(['error'=>'Danh mục không tồn tại','status'=>false],404);
            }
            $image=$request->file('image');
            if($image){
                Storage::disk('public')->delete($category->image);
                $category->image=$this->fileName($image,'category');
            }
            $category->name=$request->input('name');

            $category->save();
            DB::commit();
            return response()->json(['status'=>true,'message'=>'Cập nhật thành công'],200);
        }catch (Exception $exception) {
            return response()->json(['error' => $exception->getMessage(), 'status' => false], 500);
        }
    }

    public function show($id)
    {
        try {
            $category = CategoryModel::find($id);

            if (!$category) {
                return response()->json(['error' => "Không tìm thấy danh mục", 'status' => false], 404);
            }

            return response()->json(['data' => $category, 'status' => true], 200);
        } catch (Exception $exception) {
            return response()->json(['error' => "Lỗi trong quá trình hiển thị danh mục", 'status' => false], 500);
        }
    }


}




