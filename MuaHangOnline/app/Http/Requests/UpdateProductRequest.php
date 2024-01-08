<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class UpdateProductRequest extends FormRequest
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
            'title' => 'required|string',
            'description' => 'required|string',
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
//            'title.required' => 'Trường tiêu đề là bắt buộc.',
//            'description.required' => 'Trường mô tả là bắt buộc.',
            'price.required' => 'Trường giá là bắt buộc.',
            'discount.required' => 'Trường giảm giá là bắt buộc.',
            'sub_category_id.required' => 'Trường sub_category_id là bắt buộc.',
            'sub_category_id.integer' => 'sub_category_id phải là một số nguyên.',
            'colors.required' => 'Ít nhất một màu là bắt buộc.',
            'colors.*.name.required' => 'Tên của mỗi màu là bắt buộc.',
            'colors.*.sizes.required' => 'Kích cỡ của mỗi màu là bắt buộc.',
            'colors.*.sizes.*.name.required' => 'Tên của mỗi kích cỡ là bắt buộc.',
            'colors.*.sizes.*.quantity.required' => 'Số lượng của mỗi kích cỡ là bắt buộc.',
            'colors.*.sizes.*.quantity.integer' => 'Số lượng của mỗi kích cỡ phải là số nguyên.',

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
