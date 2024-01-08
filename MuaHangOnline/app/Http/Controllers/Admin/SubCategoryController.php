<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubCategoryRequest;
use App\Models\Categories\CategoryModel;
use App\Models\Categories\SubCategoryModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SubCategoryController extends Controller
{
    /**
     * List Sub Category
     */
    public function index(Request $request){
        try {

            $sub=DB::table('sub_category')->
            where('category_id','=',$request->category_id)
                ->select('id','name')
                ->get();
            return response()->json(['status'=>true,'data'=>$sub]);

        }catch (\Exception $exception){
            dd($exception->getMessage());
            return response()->json(['true'=>false,'error'=>'Error']);
        }

    }

    /**
     * @param StoreSubCategoryRequest $request
     * @param                         $categoryId
     * Create SubCategory
     * @return \Illuminate\Http\JsonResponse
     */

    public function create(StoreSubCategoryRequest $request){

        DB::beginTransaction();
        try {
            $subCategory=$this->store($request,0);


            DB::commit();
            return response()->json([
                'message' => 'Create SubCategory Success',
                'status' => true,
                'sub' => $subCategory,
            ], 200);
        }catch (\Exception $exception){
            DB::rollBack();
//            dd($exception->getMessage());
            return response()->json(['error'=>'Thêm sub category thất bại'],400);
        }
    }

    /**
     * @param $request
     * @param $id
     * @param $categoryId
     *
     * @return SubCategoryModel|\Illuminate\Http\JsonResponse
     */
    public function store($request,$id){
        try {
            $category=CategoryModel::find($request->category_id);
            if(!$category){
                return response()->json(['error'=>'Danh mục cha không tồn tại'],400);
            }
            $sub=SubCategoryModel::find($id);
            if (!$sub){
              $sub=new SubCategoryModel();
            }
            $sub->name=$request->input('name');
            $sub->category_id=$request->category_id;
            $sub->save();

           return $sub;
        }catch (\Exception $exception){
//            dd($exception->getMessage());
            return response()->json(['erorr'=>'Có lỗi xảy ra'],400);
        }
    }

    /**
     * @param StoreSubCategoryRequest $request
     * @param                         $id
     * Sửa  Sub Category
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(StoreSubCategoryRequest $request,$id){
        try {
            $sub=SubCategoryModel::find($id);
            if(!$sub){
                return response()->json(['error'=>'SubCategory không tồn tại']);
            }
            $subCategory=$this->store($request,$id,$sub->category_id);
            return response()->json([
                'message' => 'Edit SubCategory Success',
                'status' => true,
                'sub' => $subCategory,
            ], 200);

        }catch (\Exception $exception){
            dd($exception->getMessage());
            return response()->json(['erorr'=>'Edit SubCategory thất bại'],400);
        }
    }

    /**
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     *                                      Delete Sub Category
     */

    public function delete($id){
        try {
            $sub=SubCategoryModel::find($id);
            if(!$sub){
                return response()->json(['status'=>false,'error'=>'SubCategory không tồn tại']);
            }
            $sub->delete();
            return response()->json(['status'=>true,'success'=>'Delete sub category success']);
        }catch (\Exception $exception){
            return response()->json(['status'=>false,'error'=>'Delete sub category failure']);
        }
    }


}
