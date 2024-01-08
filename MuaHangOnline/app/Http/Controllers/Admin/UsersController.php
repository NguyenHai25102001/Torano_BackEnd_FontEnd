<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use mysql_xdevapi\Exception;

class UsersController extends Controller
{
    public function index(){
        try {
            $users=DB::table('users')->select('id', 'name','email',
            'role_id')
            ->paginate(20);
         ;
            return response()->json([
                'status' => true,
                'users' =>$users
            ],200);

        }catch (Exception $exception){
            return response()->json([
                'status' => false,
                'error' => 'Lỗi khi lấy danh sách người dùng'
            ],500);
        }
    }

    public function delete($id){
        try {
            $user=User::find($id);
            if(!$user){
                return response()->json([
                    'status' => false,
                    'error' => 'Người dùng không tồn tại.'
                ],404);
            }
            $user->delete();
            return response()->json([
                'status' => true,
                'message' =>"Xoá  người dùng thành công"
            ],200);

        }catch (Exception $exception){
            return response()->json([
                'status' => false,
                'error' => 'Lỗi khi lấy danh sách người dùng'
            ],500);
        }
    }
}
