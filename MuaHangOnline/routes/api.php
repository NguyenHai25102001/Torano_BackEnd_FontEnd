<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Đăng kí and Đăng nhập
Route::post('/register',[\App\Http\Controllers\User\UserController::class,'register']);
Route::post('/login',[\App\Http\Controllers\User\UserController::class,'login']);
Route::middleware('auth:api','checkLoginIn')->group(function (){
    Route::post('/change-password',[\App\Http\Controllers\User\UserController::class,'changePassWord']);
    Route::post('/refresh',[\App\Http\Controllers\User\UserController::class,'refresh']);
    Route::get('/user-profile',[\App\Http\Controllers\User\UserController::class,'userProfile']);

});
/**
 *Address
 */
Route::middleware('auth:api')->prefix('user')->group(function (){
    Route::post('/create-address',[\App\Http\Controllers\User\UserController::class,'createAddress']);
    Route::post('/edit-address/{id}',[\App\Http\Controllers\User\UserController::class,'editAddress']);
    Route::get('/destroy-address/{id}',[\App\Http\Controllers\User\UserController::class,'destroyAddress']);
    Route::get('/list-address/{id}',[\App\Http\Controllers\User\UserController::class,'listAddress']);
});

//end Login and Resgister
/*
 * Thêm product với quyền là Admin
 */
Route::middleware('auth:api','checkAdmin')->prefix('admin')->group(function (){
    Route::post('create-product',[\App\Http\Controllers\Admin\ProductController::class,'create']);
    Route::post('edit-product',[\App\Http\Controllers\Admin\ProductController::class,'create']);
    Route::post('delete-product',[\App\Http\Controllers\Admin\ProductController::class,'create']);
});
/*
 * End thêm Product
 */

/**
 * Scroll Product
 */
Route::post('/scroll/create',[\App\Http\Controllers\ScrollController::class,'create']);
Route::get('/scroll/index',[\App\Http\Controllers\ScrollController::class,'index']);





