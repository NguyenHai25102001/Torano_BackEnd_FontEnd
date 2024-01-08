<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VNPayPaymentController extends Controller
{
    public function createPaymentVNPay(){
        try {
            $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
            $vnp_Returnurl = "https://localhost/vnpay_php/vnpay_return.php";
            $vnp_TmnCode = " L2ANYT8L";//Mã website tại VNPAY
            $vnp_HashSecret = "HODDALYLQSAFGAGTYTRLIXOHPCSVCIJR"; //Chuỗi bí mật
        }catch (\Exception $exception){
            return response()->json([
                'status'=>false,
                'error'=>$exception->getMessage()
            ]);
        }
    }
}
