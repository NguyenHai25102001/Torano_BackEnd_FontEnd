<?php

namespace App\Http\Controllers\Cart;

use App\Http\Controllers\Controller;
use App\Models\Cart\CartItemModel;
use App\Models\Cart\CartModel;
use App\Models\Cart\GuestCartItemModel;
use App\Models\Cart\GuestCartModel;
use App\Models\Product\ProductModel;
use App\Models\Product\SizeModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;


class CartController extends Controller
{

    public function index(Request $request){
        try {
            $validator = Validator::make($request->all(), [
                'userId' => 'required_without:guestCartId',
                'guestCartId' => 'required_without:userId',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'error' => $validator->errors()->first(),
                ]);
            }
            $user=User::find($request->input('userId'));

            $userId=$request->input('userId');

            $guestCartId = $request->input('guestCartId');

            $cartItemsQuery = $user
                ? DB::table('cart_items')->join('carts', 'carts.id', '=', 'cart_items.cart_id')
                    ->join('products', 'products.id', '=', 'cart_items.product_id')
                    ->where('carts.user_id', '=', $userId)
                    ->select('cart_items.*', 'products.price as product_price','products.discount as product_discount',
                        'products.name as product_name')
                : DB::table('guest_cart_item')
                    ->join('products','products.id','=','guest_cart_item.product_id')
                    ->select('guest_cart_item.*','products.price as product_price',
                        'products.discount as product_discount')
                    ->where('guest_cart_id', $guestCartId);

            $cartItems = $cartItemsQuery->get();
            $cartItems->each(function ($item) {
                $item->images = ProductModel::find($item->product_id)->images;
            });
            return response()->json([
                'status'=>true,
                'quantityCartItems'=>count($cartItems),
                'cartList'=>$cartItems,

            ]);


        }catch (\Exception $exception){
            return response()->json([
                'status'=>false,
                'error'=>"Lỗi trong quá trình gọi danh sách sản phẩm."
            ]);
        }
    }


    public function create(Request $request)
    {

        try {
            $userId = $request->input('userId');

            $user = User::find($userId);

            if ($user) {
                $userCart = CartModel::createCart($userId);
                $userCart->save();
                return response()->json(['message' => 'Shopping cart created successfully', 'status' => 1], 200);
            }

            $guestCart = GuestCartModel::createGuestCart();

            $guestCart->save();

            return response()->json(['message' => 'Shopping cart created successfully', 'status' => 0,'guestCart'=>$guestCart], 200);
        } catch (\Exception $exception) {
            return response()->json(['error' => 'An error occurred during the process', 'status' => false], 500);
        }
    }

    public function createCartItem(Request $request)
    {
        try {

            $validator=Validator::make($request->all(),[
                'quantity'=>'required|integer',
                'productId'=>'required',
                'colorId'=>'required',
                'colorName'=>'required',
                'sizeId'=>'required',
                'sizeName'=>'required',
            ],[
                'quantity.required'=>'Số lượng không được trống',
                'productId.required'=>'sản phẩm không tồn tại',
                'quantity.integer'=>'Số lượng phải là số nguyên'
            ]);

            if($validator->fails()){
                return response()->json(['error' => $validator->errors()->first(), 'status' => false], 400);
            }
            $userId = $request->input('userId');

            $productId = $request->input('productId');

            $guestCartId = $request->input('guestCartId');

            $quantity = $request->input('quantity');

            $colorId=$request->input('colorId');

            $colorName=$request->input('colorName');

            $sizeId=$request->input('sizeId');

            $sizeName=$request->input('sizeName');

            $user = User::find($userId);

            $quantitySize=SizeModel::find($sizeId)->quantity;

            if($quantitySize<=0){
                return response()->json([
                    'status'=>'false',
                    'error'=>'Số lượng trong kho đã hết'
                ]);
            }
            $countQuantityCartItem=0;

            if ($user) {

                $cart = DB::table('carts')->where('user_id', $userId)->first();

                if (!$cart) {
                    $cart = CartModel::createCart($userId);
                }
                $cartItem = CartItemModel::where('cart_id', $cart->id)
                    ->where('product_id', $productId)
                    ->where('color_id', $colorId)
                    ->where('size_id', $sizeId)
                    ->first();

                if (!$cartItem) {
                    $cartItem = CartItemModel::createCartItem($cart->id, $productId, $quantity, $colorId, $colorName, $sizeId, $sizeName);
                } else {
                    if($quantitySize > $cartItem->quantity){
                        $cartItem->quantity += 1;
                    }else{
                        return response()->json([
                            'status'=>'false',
                            'error'=>'Số lương kho đã đến giới hạn'
                        ]);
                    }

                }
                $countQuantityCartItem = CartItemModel::where('cart_id', $cart->id)->count();

            } else {
                $guestCart = GuestCartModel::find($guestCartId);

                if (!$guestCart) {
                    $guestCart = GuestCartModel::createGuestCart();
                }
                $guestCartItem = GuestCartItemModel::where('guest_cart_id', $guestCart->id)
                    ->where('product_id', $productId)
                    ->where('color_id', $colorId)
                    ->where('size_id', $sizeId)
                    ->first();

                if (!$guestCartItem) {
                    $guestCartItem = GuestCartItemModel::createGuestCartItem($guestCart->id, $productId, $quantity, $colorId, $colorName, $sizeId, $sizeName);
                }else{
                    if($quantitySize > $guestCartItem->quantity){
                        $guestCartItem->quantity += 1;
                    }else{
                        return response()->json([
                            'status'=>'false',
                            'quantityCartItem'=>count(),
                            'error'=>'Số lương kho đã đến giới hạn'
                        ]);
                    }
                }
                $countQuantityCartItem = GuestCartItemModel::where('guest_cart_id', $guestCart->id)->count();
            }

            DB::beginTransaction();

            try {
                // Lưu mục giỏ hàng
                $data='';
                if (isset($cartItem)) {
                    $cartItem->save();
                    $data=$cartItem;
                } elseif (isset($guestCartItem)) {
                    $guestCartItem->save();
                    $data=$guestCartItem;
                }

                DB::commit();

                return response()->json(['message' => 'Thêm sản phẩm thành công',
                                         'status' => true,'data'=>$data,
                    'quantityCartItem'=>$countQuantityCartItem], 200);
            } catch (\Exception $exception) {
                DB::rollBack();

                return response()->json(['error' => 'Thêm sản phẩm vào giỏ hàng bị lỗi', 'status' => false], 500);
            }
        } catch (\Exception $exception) {
            return response()->json(['error' => 'Thêm sản phẩm vào giỏ hàng bị lỗi', 'status' => false], 500);
        }
    }

    public function deleteCart(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'userId' => 'required_without:guestCartId',
                'guestCartId' => 'required_without:userId',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'error' => $validator->errors()->first(),
                ]);
            }


            $user = User::find($request->input('userId'));

            if ($user) {

                $cartItem = DB::table('cart_items')->where('id', $id)->first();

                if ($cartItem) {
                    DB::table('cart_items')->where('id', $id)->delete();

                    return response()->json([
                        'status' => true,
                        'message' => 'Cart item deleted successfully',
                    ], 200);
                }
            } else {
                $guestCartItem = DB::table('guest_cart_item')->where('id', $id)->first();

                if ($guestCartItem) {
                    DB::table('guest_cart_item')->where('id', $id)->delete();

                    return response()->json([
                        'status' => true,
                        'message' => 'Guest cart item deleted successfully',
                    ], 200);
                }
            }

            return response()->json([
                'status' => false,

                'error' => 'Product not found in cart',
            ], 404);

        } catch (\Exception $exception) {
            return response()->json([
                'status' => false,
                'error' => 'Có lỗi trong quá trình xoá',
            ], 500);
        }
    }

    public function updateQuantityCartItem(Request $request, $id){
        try {
            $validator = Validator::make($request->all(), [
                'userId' => 'required_without:guestCartId',
                'guestCartId' => 'required_without:userId',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'error' => $validator->errors()->first(),
                ]);
            }
            $user = User::find($request->input('userId'));
            $cartItem = CartItemModel::find($id);

            if (!$cartItem || !$user) {
                $cartItem = GuestCartItemModel::find($id);
            }

            if ($cartItem) {
                $size = SizeModel::find($cartItem->size_id);

                $quantityChange = 0;

                if ($request->input('action') === 'down') {
                    $quantityChange = -1;
                } elseif ($request->input('action') === 'up') {
                    $quantityChange = 1;
                    if ($size->quantity < $cartItem->quantity + 1) {
                        return response()->json([
                            'status' => false,
                            'error' => 'Số lượng kho đã đến giới hạn',
                        ], 400);
                    }
                }

                $cartItem->quantity += $quantityChange;
                $cartItem->save();

                return response()->json([
                    'status' => true,
                    'error' => 'Update product in cart success',

                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'error' => 'Product not found in cart',
                ], 404);
            }
        } catch (\Exception $exception) {
            return response()->json([
                'status' => false,
                'error' => 'Có lỗi trong quá trình cập nhật số lượng',
            ], 500);
        }
    }


}
