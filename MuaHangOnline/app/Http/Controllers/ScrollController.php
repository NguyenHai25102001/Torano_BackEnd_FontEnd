<?php

namespace App\Http\Controllers;


use App\Models\Scroll\ScrollMediaModel;
use App\Models\Scroll\ScrollProductModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
class ScrollController extends Controller
{
    /**
     * Display a listing of the resource.
         */
    public function index(Request $request)
    {
        try {
            $limit = $request->input('limit', 5); // Mặc định là 5 nếu không có giá trị được truyền vào

            $query = ScrollProductModel::with('scrollMedia');

            // Kiểm tra nếu có giới hạn và là một số dương
            if ($limit !== null && is_numeric($limit) && $limit > 0) {
                $query->take($limit);
            }

            $scrollProducts = $query->get();

            return response()->json([
                'status' => true,
                'scrollProducts' => $scrollProducts,
            ]);

        } catch (\Exception $exception) {
            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        DB::beginTransaction();

        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'price' => 'required',
                'type' => 'required|in:image,video',
                'file_path.*' => 'sometimes|required|mimes:jpeg,jpg,png,mp4|max:2048',
                'file_path' => 'required',
            ], [
                'name.required' => 'Bạn chưa nhập tên',
                'price.required' => 'Bạn chưa nhập giá',
                'type.required' => 'Bạn chưa nhập loại scrollMedia',
                'type.in' => 'Loại scrollMedia không hợp lệ',
                'file_path.required' => 'Bạn chưa nhập đường dẫn file của scrollMedia',
                'file_path.*.mimes' => 'Định dạng file không hợp lệ. Chỉ chấp nhận ảnh (jpeg, jpg, png) và video (mp4)',
                'file_path.*.max' => 'Kích thước file quá lớn, chỉ chấp nhận file dưới 2MB',
            ]);
            // Thêm điều kiện kiểm tra nếu không có file trong file_path

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'error' => $validator->errors()->first()
                ]);
            }

            $scrollProduct = new ScrollProductModel([
                'name' => $request->input('name'),
                'price' => $request->input('price')
            ]);
            $scrollProduct->save();

            if ($request->input('type') === 'video') {
                // Handle video upload
                $videoFiles = $request->file('file_path');

                if (is_array($videoFiles)) {
                    $videoFile = $videoFiles[0];
                } else {
                    $videoFile = $videoFiles;
                }

                if ($videoFile->isValid()) {
                    $videoFileName = uniqid('', true) . '.' . $videoFile->extension();
                    $videoPath = $videoFile->storeAs('public/uploads/videos', $videoFileName);

                    if (!$videoPath) {
                        DB::rollBack();
                        return response()->json([
                            'status' => false,
                            'error' => 'Failed to store video.',
                        ], 500);
                    }

                    $scrollMedia = new ScrollMediaModel([
                        'type' => 'video',
                        'file_path' => $videoFileName,
                        'scroll_product_id' => $scrollProduct->id,
                    ]);
                    $scrollMedia->save();
                } else {
                    DB::rollBack();
                    return response()->json([
                        'status' => false,
                        'error' => 'Invalid video file.',
                    ]);
                }
            } elseif ($request->input('type') === 'image') {
                $imageFiles = $request->file('file_path');

                if (is_array($imageFiles)) {
                    foreach ($imageFiles as $imageFile) {
                        $this->processImage($imageFile, $scrollProduct->id);
                    }
                } else {
                    $this->processImage($imageFiles, $scrollProduct->id);
                }
            }

            $scrollProduct->load('scrollMedia');
            DB::commit();

            return response()->json([
                'status' => true,
                'scrollProduct' => $scrollProduct,
            ]);
        } catch (\Exception $exception) {
            DB::rollBack();

            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }

    private function processImage($imageFile,$scrollProductId)
    {
        if ($imageFile->isValid()) {
            $imageFileName = uniqid('', true) . '.' . $imageFile->extension();
            $imagePath = $imageFile->storeAs('public/uploads/images', $imageFileName);

            if (!$imagePath) {
                DB::rollBack();
                return response()->json([
                    'status' => false,
                    'error' => 'Failed to store image.',
                ], 500);
            }

            $scrollMedia = new ScrollMediaModel([
                'type' => 'image',
                'file_path' => $imageFileName,
                'scroll_product_id' => $scrollProductId,
            ]);
            $scrollMedia->save();
        } else {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'error' => 'Invalid image file.',
            ]);
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
