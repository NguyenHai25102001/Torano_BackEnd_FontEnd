<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order\OrderModel;
use Illuminate\Http\Request;

class OrderController extends Controller
{

    public function index(Request $request) {
        try {
            $orders = OrderModel::when($request->input('paymentStatus'),function ($query,$paymentStatus){
                return $query->where('payment_status',$paymentStatus);
            })
                ->when($request->input('orderStatus'),function ($query,$orderStatus){
                    return $query->where('order_status',$orderStatus);
                })
                ->orderBy('created_at', 'desc')->paginate(10);

            return response()->json([
                'status' => true,
                'orders' => $orders
            ], 200);
        } catch (\Exception $exception) {
            return response()->json(['error' => 'Có lỗi xảy ra'], 500);
        }
    }

    public function changeOrderStatus(Request $request,$id){

        try {
            $order=OrderModel::find($id);

            if (!$order){
                return response()->json([
                    'status'=>false,
                    'error'=>'Đơn hàng không tồn tại'
                ],404);
            }
            $order->order_status=$request->input('orderStatus');
            $order->save();
            return response()->json([
                'status'=>true,
                'message'=>'Cập nhật trạng thái đơn hàng thành công'
            ],200);
        } catch (\Exception $exception) {
            return response()->json(['error' => 'Có lỗi xảy ra'], 500);
        }
    }


    public function changePaymentOrderStatus(Request $request,$id){

        try {
            $order=OrderModel::find($id);

            if (!$order){
                return response()->json([
                    'status'=>false,
                    'error'=>'Đơn hàng không tồn tại'
                ],404);
            }
            $order->payment_status=$request->input('paymentStatus');
            $order->save();
            return response()->json([
                'status'=>true,
                'message'=>'Cập nhật trạng thái thanh toán đơn hàng thành công'
            ],200);
        } catch (\Exception $exception) {
            return response()->json(['error' => 'Có lỗi xảy ra'], 500);
        }
    }
    public function deleteOrder($id){

    try {
        $order=OrderModel::find($id);

        if (!$order){
            return response()->json([
                'status'=>false,
                'error'=>'Đơn hàng không tồn tại'
            ],404);
        }

        $order->delete();
        return response()->json([
            'status'=>true,
            'message'=>'Delete Order success'
        ],200);
    } catch (\Exception $exception) {
        return response()->json(['error' => 'Có lỗi xảy ra'], 500);
    }
}

}
