<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BannerModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class BannerController extends Controller
{
    public function createBanner(Request $request){
        DB::beginTransaction();
        try {
            $validator = Validator::make($request->all(), [
                'path' => 'required|file'
            ], [
                'path.required' => 'Banner không được để trống',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'error' => $validator->getMessageBag()->first(),
                ]);
            }

            $path = $this->fileNamePath($request->file('path'), 'banners');

            $banner = BannerModel::createBanner($path);
            $banner->save();

            DB::commit();

            return response()->json([
                'status' => true,
                'error' => 'Thêm banner thành công'
            ]);
        } catch (\Exception $exception) {
            DB::rollBack();

            return response()->json([
                'status' => false,
                'error' => 'Có lỗi xảy ra' . $exception->getMessage()
            ]);
        }
    }


}
