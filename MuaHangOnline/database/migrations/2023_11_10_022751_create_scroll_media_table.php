<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('scroll_media', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('scroll_product_id');
            $table->enum('type', ['image', 'video']);
            $table->string('file_path', 255);
            $table->timestamps();

            // Tạo foreign key cho scroll_product_id
            $table->foreign('scroll_product_id')->references('id')->on('scroll_products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scroll_media');
    }
};
