<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class StoreSubCategoryRequest extends FormRequest
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
            'name'=>'required',
            'category_id'=>'required|int'
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'Sub category không được để trống',
            'name.unique' => 'Sub category đã tồn tại',
            'category_id.required' => 'Category ID không được để trống',
            'category_id.int' => 'Category ID phải là một số nguyên',
        ];
    }
    protected function failedValidation(Validator $validator)
    {
        $error = (new ValidationException($validator))->errors();

        throw new HttpResponseException(response()->json(
            [
                'status' => false,
                'error' => $error,
            ],
            JsonResponse::HTTP_UNPROCESSABLE_ENTITY
        ));
    }
}
