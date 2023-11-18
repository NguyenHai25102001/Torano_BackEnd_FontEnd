<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use mysql_xdevapi\Exception;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        DB::beginTransaction();
        try {
            $validator=Validator::make($request->all(),[
                'name'=>'required|string|max:30',
                'title'=>'required|string',
                'description'=>'required|string',
            ],[
                'name.required'=>'Bạn chưa nhập tên sản phẩm',
                'title.required'=>'Bạn chưa nhập tiêu đề sản phẩm',
                'description.required'=>'Bạn chưa nhập miêu tả sản phẩm',
            ]);
            if($validator->failed()){
                return response()->json(['error'=>$validator->errors()->first()]);
            }
            $product=new Product([
                'name'=>$request->input('name'),
                'title'=>$request->input('title'),
                'description'=>$request->input('description'),
            ]);
            $data=[
                'status'=>true,
                'product'=>$product,
            ];
            $product->save();
            DB::commit();
            return response()->json($data);
        }catch (\Exception $exception){
            DB::rollBack();
            return response()->json(['error'=>$exception->getMessage(),'status'=>false]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
