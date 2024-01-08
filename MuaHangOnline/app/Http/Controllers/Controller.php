<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function fileNamePath($file, $path)
    {
        if ($file && $file->isFile()) {
            $fileName = uniqid('', false) . '_' . $file->getClientOriginalName();
            $file->storeAs('public/uploads/' . $path, $fileName);
            return 'uploads/'.$path.'/'.$fileName;
        }
        return response()->json(['error' => 'Ảnh không phải là file'], 400);
    }
}
