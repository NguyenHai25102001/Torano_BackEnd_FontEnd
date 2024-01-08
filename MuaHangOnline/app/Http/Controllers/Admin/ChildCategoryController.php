<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreChildCategoryRequest;
use App\Models\Categories\ChildCategoryModel;
use App\Models\Categories\SubCategoryModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChildCategoryController extends Controller
{
    /**
     * @param $subId
     * List
     * @return \Illuminate\Http\JsonResponse
     *
     */
    public function index(Request $request){
        try {
            $sub=SubCategoryModel::find($request->subId);
            if(!$sub){
                return response()->json(['status'=>false,'error'=>'Không tìm thấy Sub Category'],400);
            }
            $child=DB::table('child_category')
                ->join('sub_category','sub_category.id','child_category.sub_category_id')
                ->where('sub_category.id','=',$request->subId)
                ->select('child_category.id','child_category.name')->get();
            return response()->json(['status'=>true,
                'data'=>$child],200);

        }catch (\Exception $exception){

            return response()->json(['error'=>'Error','status'=>false],400);
        }

    }

    /**
     * @param $subId
     *              Create Child Category
     */
    public function create(StoreChildCategoryRequest $request)
    {
        DB::beginTransaction();

        try {
            $child = $this->store($request, 0);
            $sub = SubCategoryModel::find($request->sub_category_id);

            if (!$sub) {
                return response()->json(['status' => false, 'error' => 'Không tìm thấy Sub Category'], 400);
            }
            DB::commit();

            return response()->json([
                'status' => true,
                'success' => 'Thêm Child thành công',
                'data' => $child,
            ]);
        } catch (\Exception $exception) {
            DB::rollBack();

            return response()->json(['status' => false, 'error' => 'Create Child Category failure'], 400);
        }
    }

    public function store($request, $childId)
    {
        try {


            $child = ChildCategoryModel::find($childId);

            if (!$child) {
                $child = new ChildCategoryModel();
            }

            $child->name = $request->input('name');
            $child->sub_category_id = $request->sub_category_id;
            $child->save();

            return $child;
        } catch (\Exception $exception) {
            return response()->json(['status' => false, 'error' => 'Error'], 400);
        }
    }


    public function edit(StoreChildCategoryRequest $request,$id){
        try {
            $check=ChildCategoryModel::find($id);
            if(!$check){
                return response()->json(['status'=>false,'error'=>'Không tìm thấy chil Category'],400);
            }
            $child=$this->store($request,$id);
            return response()->json([
                'status'=>true,
                'data'=>$child,
                'message'=>'Update ChildCategory success'
            ]);

        }catch (\Exception $exception){
            return response()->json(['error'=>'Error  edit child sub category','status'=>false],400);
        }
    }
    public function delete($id)
    {
        try {
            $child = ChildCategoryModel::find($id);

            if (!$child) {
                return response()->json(['error' => 'Không tìm thấy Child Category'], 404);
            }

            $child->delete();

            return response()->json(['status' => true, 'message' => 'Delete Child Category success'], 200);
        } catch (\Exception $exception) {
            // Log the exception or handle it accordingly
            return response()->json(['error' => 'Error delete child sub category', 'status' => false], 400);
        }
    }

}
