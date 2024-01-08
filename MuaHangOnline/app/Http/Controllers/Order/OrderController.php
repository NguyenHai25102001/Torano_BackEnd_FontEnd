<?php

namespace App\Http\Controllers\Order;
use App\Mail\OrderEmail;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use App\Models\Cart\CartModel;
use App\Models\Cart\GuestCartModel;
use App\Models\Order\OrderItemModel;
use App\Models\Order\OrderModel;
use App\Models\Product\ProductModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
class OrderController extends Controller
{

    public function create(Request $request)
    {
        DB::beginTransaction();

        try {

            $validator = Validator::make($request->all(), [
                'userId' => 'required_without:guestCartId',
                'guestCartId' => 'required_without:userId',
                'totalAmount' => 'required|numeric|min:0',
                'userName' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'required|numeric|digits:10',
                'provinceId' => 'required|numeric',
                'province' => 'required|string|max:255',
                'districtId' => 'required|numeric',
                'district' => 'required|string|max:255',
                'ward' => 'required|string|max:255',
                'wardId' => 'required|numeric',
                'address' => 'required|string|max:255',

            ], [
                'totalAmount.required' => 'Tổng tiền không được để trống',
                'totalAmount.numeric' => 'Tổng tiền phải là số',
                'totalAmount.min' => 'Tổng tiền không được nhỏ hơn :min',

                'userName.required' => 'Tên người dùng không được để trống',
                'userName.string' => 'Tên người dùng phải là chuỗi',
                'userName.max' => 'Tên người dùng không được vượt quá :max ký tự',

                'email.required' => 'Email không được để trống',

                'email.max' => 'Email không được vượt quá :max ký tự',

                'phone.required' => 'Số điện thoại không được để trống',
                'phone.numeric' => 'Số điện thoại phải là số',
                'phone.digits' => 'Số điện thoại phải có :digits chữ số',

                'provinceId.required' => 'ID tỉnh không được để trống',
                'provinceId.numeric' => 'ID tỉnh phải là số',

                'province.required' => 'Tỉnh không được để trống',
                'province.string' => 'Tỉnh phải là chuỗi',
                'province.max' => 'Tỉnh không được vượt quá :max ký tự',

                'districtId.required' => 'ID quận/huyện không được để trống',
                'districtId.numeric' => 'ID quận/huyện phải là số',

                'district.required' => 'Quận/huyện không được để trống',
                'district.string' => 'Quận/huyện phải là chuỗi',
                'district.max' => 'Quận/huyện không được vượt quá :max ký tự',

                'ward.required' => 'Xã/phường không được để trống',
                'ward.string' => 'Xã/phường phải là chuỗi',
                'ward.max' => 'Xã/phường không được vượt quá :max ký tự',

                'wardId.required' => 'ID xã/phường không được để trống',
                'wardId.numeric' => 'ID xã/phường phải là số',

                'address.required' => 'Địa chỉ không được để trống',
                'address.string' => 'Địa chỉ phải là chuỗi',
                'address.max' => 'Địa chỉ không được vượt quá :max ký tự',
                'email.email' => 'Email không đúng định dạng',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()->first(), 'status' => false], 400);
            }

            $userId = $request->input('userId');
            $totalAmount = $request->input('totalAmount');
            $guestCartId = $request->input('guestCartId');
            $provinceId = $request->input('provinceId');
            $province = $request->input('province');
            $districtId = $request->input('districtId');
            $district = $request->input('district');
            $wardId = $request->input('wardId');
            $ward = $request->input('ward');
            $address = $request->input('address');
            $userName = $request->input('userName');
            $email = $request->input('email');
            $phone = $request->input('phone');


            $user = User::find($userId);

            if ($user) {
                $order = OrderModel::createOrder($userId, null, $totalAmount, 0, 0,$provinceId,$province,
                    $districtId,$district,$wardId,$ward,$address,$userName,$email,$phone);
            } else {
                $guestCart = GuestCartModel::find($guestCartId);

                if (!$guestCart) {
                    throw new \Exception('Guest cart not found');
                }

                $order = OrderModel::createOrder(null, $guestCartId, $totalAmount, 0, 0,$provinceId,$province,
                    $districtId,$district,$wardId,$ward,$address,$userName,$email,$phone);
            }

            $order->save();

            $cartItemsQuery = $user
                ? DB::table('cart_items')->join('carts', 'carts.id', '=', 'cart_items.cart_id')
                    ->join('products', 'products.id', '=', 'cart_items.product_id')
                    ->where('carts.user_id', '=', $userId)
                    ->select('cart_items.*', 'products.price as product_price','products.discount as product_discount')
                : DB::table('guest_cart_item')
                    ->join('products','products.id','=','guest_cart_item.product_id')
                    ->select('guest_cart_item.*','products.price as product_price','products.discount as product_discount')
                    ->where('guest_cart_id', $guestCartId);

            $cartItems = $cartItemsQuery->get();

            foreach ($cartItems as $cartItem) {
                $subtotal = $cartItem->quantity * $cartItem->product_price + $cartItem->product_discount;
                $orderItem = OrderItemModel::createOrderItem($order->id, $cartItem->product_id, $cartItem->quantity, $subtotal, $cartItem->color_name, $cartItem->size_name);
                $orderItem->save();
               $this->deleteCartItem($user,$guestCartId,$cartItem->id);
            }
            Mail::to($order->email)->send(new OrderEmail($order));
            DB::commit();
            return response()->json(['message' => 'Đặt hàng thành công', 'status' => true,
                'order'=>$order], 200);
        } catch (\Exception $exception) {
            DB::rollBack();
            return response()->json(['error' => 'Có lỗi xảy ra trong đặt hàng'], 500);
        }



    }
    private function deleteCartItem($user, $guestCartId, $cartItemId)
    {
        if ($user) {
            DB::table('cart_items')->where('id', $cartItemId)->delete();
        } else {
            DB::table('guest_cart_item')->where('id', $cartItemId)->delete();
        }
    }




}
