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
    Route::post('edit-product',[\App\Http\Controllers\Admin\ProductController::class,'edit']);
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



/**
 * Route cho quyền là Admin
 */
//middleware(['auth:api','isAdmin'])->
Route::middleware(['auth:api','isAdmin'])->prefix('admin')->group(function (){
    Route::post('category/create',[\App\Http\Controllers\Admin\CategoriesController::class,'create']);
    Route::get('category/index',[\App\Http\Controllers\Admin\CategoriesController::class,'index']);
    Route::get('category/{id}',[\App\Http\Controllers\Admin\CategoriesController::class,'show']);
    Route::post('category/edit/{id}',[\App\Http\Controllers\Admin\CategoriesController::class,'edit']);
    Route::delete('category/delete/{id}',[\App\Http\Controllers\Admin\CategoriesController::class,'delete']);
    //subcategory
    Route::post('sub-category/create',[\App\Http\Controllers\Admin\SubCategoryController::class,'create']);
    Route::post('sub-category/edit/{id}',[\App\Http\Controllers\Admin\SubCategoryController::class,'edit']);
    Route::delete('sub-category/delete/{id}',[\App\Http\Controllers\Admin\SubCategoryController::class,'delete']);
    Route::post('sub-category',[\App\Http\Controllers\Admin\SubCategoryController::class,'index']);
    //child category
    Route::post('child-category/create',[\App\Http\Controllers\Admin\ChildCategoryController::class,'create']);
    Route::post('child-category/edit/{id}',[\App\Http\Controllers\Admin\ChildCategoryController::class,'edit']);
    Route::delete('child-category/delete/{id}',[\App\Http\Controllers\Admin\ChildCategoryController::class,'delete']);
    Route::post('child-category',[\App\Http\Controllers\Admin\ChildCategoryController::class,'index']);


    //Product
    Route::post('product/create',[\App\Http\Controllers\Admin\ProductController::class,'create']);
    Route::get('product/{id}',[\App\Http\Controllers\Admin\ProductController::class,'showProductDetails']);
    Route::post('update-product/{id}',[\App\Http\Controllers\Admin\ProductController::class,'edit']);
    Route::get('list-product',[\App\Http\Controllers\Admin\ProductController::class,'index']);
    Route::delete('delete-product/{id}',[\App\Http\Controllers\Admin\ProductController::class,'delete']);
    Route::post('change-pro-status/{id}',[\App\Http\Controllers\Admin\ProductController::class,'changeProductStatus']);

    //User
    Route::get('list-user',[\App\Http\Controllers\Admin\UsersController::class,'index']);
    Route::delete('delete-user/{id}',[\App\Http\Controllers\Admin\UsersController::class,'delete']);


    //Order
    Route::get('list-order',[\App\Http\Controllers\Admin\OrderController::class,'index']);
    Route::post('change-order-status/{id}',[\App\Http\Controllers\Admin\OrderController::class,'changeOrderStatus']);
    Route::post('change-order-payment/{id}',[\App\Http\Controllers\Admin\OrderController::class,'changePaymentOrderStatus']);
    Route::delete('delete-order/{id}',[\App\Http\Controllers\Admin\OrderController::class,'deleteOrder']);


    //Banner

    Route::post('banner-create',[\App\Http\Controllers\Admin\BannerController::class,'createBanner']);



});

/**
 * End route Admin
 */


/* Wed */
Route::prefix('web')->group(function (){
    Route::get('category-list',[\App\Http\Controllers\Web\WebController::class,'categoriesList']);
    Route::get('collection-categories',[\App\Http\Controllers\Web\WebController::class,'collectionCategory']);
    Route::get('by-code-product-list/{code}',[\App\Http\Controllers\Web\WebController::class,'productList']);
    Route::get('product-details/{id}',[\App\Http\Controllers\Web\WebController::class,'productDetails']);

    /**
     * cart
    */

    Route::post('create-cart',[\App\Http\Controllers\Cart\CartController::class,'create']);

    Route::post('create-cart_item',[\App\Http\Controllers\Cart\CartController::class,'createCartItem']);

    Route::get('list-cart_item',[\App\Http\Controllers\Cart\CartController::class,'index']);

    Route::delete('delete-cart_item/{id}',[\App\Http\Controllers\Cart\CartController::class,'deleteCart']);

    Route::post('update-quantity-cart_item/{id}',[\App\Http\Controllers\Cart\CartController::class,'updateQuantityCartItem']);

    /**
     * End Cart
     */


    /**
     * Order
    */
    Route::post('create-order',[\App\Http\Controllers\Order\OrderController::class,'create']);



    /**
     * end order
     */


    /**Home */
    Route::get('collection-product-sale',[\App\Http\Controllers\Web\WebController::class,'collectionProductSale']);
    Route::get('collection-product',[\App\Http\Controllers\Web\WebController::class,'collectionProduct']);


    /**End Home*/

});

Route::middleware(['auth:api'])->group(function (){
    Route::get('logout',[\App\Http\Controllers\User\UserController::class,'logout']);
});
/* Web */


