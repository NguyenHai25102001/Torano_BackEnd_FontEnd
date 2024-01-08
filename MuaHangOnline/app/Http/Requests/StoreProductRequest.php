<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'code' => 'required|string',
//            'title' => 'required|string',
//            'description' => 'required|string',
            'price' => 'required|numeric',
            'colors' => 'required|array',
            'colors.*.name' => 'required|string',
            'colors.*.sizes' => 'required|array',
            'colors.*.sizes.*.name' => 'required|string',
            'colors.*.sizes.*.quantity' => 'required|integer',
        ];

    }

    public function messages()
    {
        return [
            'name.required' => 'Trường tên là bắt buộc.',
            'code.required' => 'Trường mã là bắt buộc.',
            'title.required' => 'Trường tiêu đề là bắt buộc.',
            'description.required' => 'Trường mô tả là bắt buộc.',
            'price.required' => 'Trường giá là bắt buộc.',
            'discount.required' => 'Trường giảm giá là bắt buộc.',
            'color.required' => 'Trường màu là bắt buộc.',
            'color.array' => 'Màu phải là một mảng.',
            'color.sizes.required' => 'Trường sizes của màu là bắt buộc.',
            'color.sizes.array' => 'Sizes của màu phải là một mảng.',
            'color.sizes.*.name.required' => 'Mỗi tên size là bắt buộc.',
            'color.sizes.*.name.string' => 'Mỗi tên size phải là một chuỗi.',
            'color.sizes.*.quantity.required' => 'Mỗi số lượng size là bắt buộc.',
            'color.sizes.*.quantity.integer' => 'Mỗi số lượng size phải là một số nguyên.',
        ];
    }



    protected function failedValidation(Validator $validator)
    {
        $error = (new ValidationException($validator))->errors();
        $firstError = reset($error);
        throw new HttpResponseException(response()->json(
            [
                'status' => false,
                'error' =>$firstError[0],
            ],
            JsonResponse::HTTP_UNPROCESSABLE_ENTITY
        ));
    }
}
