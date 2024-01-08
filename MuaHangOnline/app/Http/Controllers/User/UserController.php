<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Mail\ConfirmationEmail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request)
    {
        DB::beginTransaction();
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
            ], [
                'name.required' => 'Vui lòng nhập tên.',
                'email.required' => 'Vui lòng nhập email.',
                'email.email' => 'Email không hợp lệ.',
                'email.max' => 'Email không được quá 255 ký tự.',
                'email.unique' => 'Email đã tồn tại.',
                'password.required' => 'Vui lòng nhập mật khẩu.',
                'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự.',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()->all(), 'status' => false], 400);
            }
            $user = new User([
                'name' => $request->input('name'),
                'password' => bcrypt($request->input('password')),
                'email' => $request->input('email'),
                'role_id' => 2
            ]);
            if ($user->save()) {
                // Send confirmation email
                Mail::to($user->email)->send(new ConfirmationEmail($user));
                DB::commit(); // Transaction successful

                $data = [
                    'status' => true,
                    'user' => $user,
                ];
                return response()->json($data);
            } else {
                DB::rollBack(); // Failed to save the user
                return response()->json(['error' => 'Failed to save the user. Please try again.'], 500);
            }
        } catch (\Exception $exception) {
            DB::rollBack(); // Error occurred
            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }

    /**
     * @param Request $request
     *Login với JWT
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        DB::beginTransaction();
        try {
            $validator =Validator::make($request->all(),
                [
                    'email'    => 'required|string|email|max:255',
                    'password' => 'required|string|min:8',
                ], [
                    'email.required'    => 'Vui lòng nhập email.',
                    'email.email'       => 'Email không hợp lệ.',
                    'email.max'         => 'Email không được quá 255 ký tự.',
                    'password.required' => 'Vui lòng nhập mật khẩu.',
                    'password.min'      => 'Mật khẩu phải có ít nhất 8 ký tự.',
                ]);
            if ($validator->fails()) {
                return response()->json([
                    'status'=>false,'error' => $validator->errors()->first()], 400);
            }
            if (!$token = auth()->attempt($validator->validated())) {
                return response()->json([
                    'status'=>false
                    ,'error' => 'Tài khoản và mật không chính xác', 422]);
            }
            DB::commit();
            return $this->createdNewToken($token);
        } catch (\Exception $exception) {
            DB::rollBack();
            return response()->json(['error' => 'Lỗi trong quá trình đăng nhập'], 500);
        }
    }
    /**
     * Refresh token
     */
    public function refresh(){
        return $this->createdNewToken(auth()->refresh());
    }
    /**
     * Get the authentication
     */
    public function userProfile(){
        return response()->json(auth()->user());
    }
        /**
         * Get the token array structure.
         *
         * @param  string $token
         *
         * @return \Illuminate\Http\JsonResponse
         */
        protected function createdNewToken($token){
            return response()->json([
                'status'=>true,
                'access_token'=>$token,
                'token_type'=>'bearer',
                'expires_in'=>auth()->factory()->getTTl()*60*24*15,
                'user'=>auth()->user(),
            ]);
        }
        /**
         * Change password
         * @return \Illuminate\Http\JsonResponse
         */
        public function changePassWord(Request $request){
            $validator=Validator::make($request->all(),[
                'old_password'=>'required|string',
                'new_password'=>'required|string'
            ],[
                'old_password.required'=>'Vui long nhap mat khau cu',
                'new_password.required'=>'Vui long nhap mat khau moi',
            ]);
            if($validator->fails()){
                return response()->json($validator->errors()->first(),400);
            }
            $userId=auth()->user()->id;
            $user=User::where('id',$userId)->update([
                'password'=>bcrypt($request->input('new_password'))
            ]);
            return response()->json([
                'message'=>'User successfully changed password',
                'user'=>$user
            ],201);
        }

    /**
     * @param Request $request
     * Create Address
     * @return \Illuminate\Http\JsonResponse
     */
    public function createAddress(Request $request)
    {
        DB::beginTransaction();
        try {
            $validator = Validator::make($request->all(), [
                'user_name' => 'required|string|max:50',
                'address' => 'required',
                'phone' => 'required',
                'user_id' => 'required',
            ], [
                'user_name.required' => 'Bạn chưa nhập tên.',
                'address.required' => 'Trường địa chỉ là bắt buộc.',
                'phone.required' => 'Trường số điện thoại là bắt buộc.',
                'user_id.required' => 'Trường user_id là bắt buộc.',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'error' => $validator->errors()->first(),
                ]);
            }

            $address = new User\AddressModel([
                'user_name' => $request->input('user_name'),
                'address' => $request->input('address'),
                'phone' => $request->input('phone'),
                'user_id' => $request->input('user_id'),
            ]);

            $address->save();
            DB::commit();

            return response()->json([
                'status' => true,
                'address' => $address,
            ], 200);
        } catch (\Exception $exception) {
            DB::rollBack();
            return response()->json(['status' => false, 'error' => $exception->getMessage()], 500);
        }
    }
    /**
     * @param Request $request
     * @param  $id
     *Edit Address
     * @return \Illuminate\Http\JsonResponse
     */
    public function editAddress(Request $request,$id){
        DB::beginTransaction();
        try {
            $address=User\AddressModel::find($id);
            if(!$address){
                return response()->json([
                    'status'=>false,
                    'error'=>'Địa chỉ không tồn tại'
                ],400);
            }
            $validator = Validator::make($request->all(), [
                'user_name' => 'required|string|max:50',
                'address' => 'required',
                'phone' => 'required',
            ], [
                'user_name.required' => 'Bạn chưa nhập tên.',
                'address.required' => 'Trường địa chỉ là bắt buộc.',
                'phone.required' => 'Trường số điện thoại là bắt buộc.',
            ]);


            if ($validator->fails()){
                return response()->json([
                    'status'=>false,
                    'error'=>$validator->errors()->first(),
                ]);
            }
            $address->user_name=$request->input('user_name');
            $address->address=$request->input('address');
            $address->phone=$request->input('phone');

            return response()->json([
                'status'=>true,
                'address'=>$address,
            ],200);
        }catch (\Exception $exception) {
            DB::rollBack(); // Error occurred
            return response()->json(['error' => $exception->getMessage()], 500);
        }

    }
    /**
     * Delete Address
     */
    public function destroyAddress(Request $request,$id){
        DB::beginTransaction();
        try {
            $address=User\AddressModel::find($id);
            if(!$address){
                return response()->json([
                    'status'=>false,
                    'error'=>'Địa chỉ không tồn tại'
                ],400);
            }
            $address->delete();
            return response()->json([
                'status'=>true,
                'message'=>'Bạn đã xoá thành công',
            ],200);
        }catch (\Exception $exception) {
            DB::rollBack(); // Error occurred
            return response()->json(['error' => $exception->getMessage()], 500);
        }

    }
    /**
     * @param $id
     *   List Address
     */
    public function listAddress($id)
    {
        DB::beginTransaction();
        try {
            $user = User::find($id);
            if (!$user) {
                return response()->json([
                    'status' => false,
                    'error' => 'Người dùng không tồn tại'
                ], 404);
            }

            $listAddress = $user->address()->get(); // Sử dụng get() để lấy danh sách địa chỉ.
                DB::commit(); // Commit giao dịch thành công.

            return response()->json([
                'status' => true,
                'listAddress' => $listAddress,
            ]);

        } catch (\Exception $exception) {
            DB::rollBack(); // Error occurred
            return response()->json(['status' => false, 'error' => $exception->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            auth()->logout();
            return response()->json(['status' => true, 'message' => 'Đăng xuất thành công']);
        } catch (\Exception $exception) {
            return response()->json(['status' => false, 'error' => 'Lỗi trong quá trình đăng xuất'], 500);
        }
    }

}
