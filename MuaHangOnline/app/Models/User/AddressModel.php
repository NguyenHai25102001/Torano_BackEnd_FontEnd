<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddressModel extends Model
{
    use HasFactory;
    protected $table='address';
    protected $fillable=[
        'user_name','address','phone','user_id'
    ];

}
