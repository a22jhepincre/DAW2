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
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->decimal('price', 8, 2);
            $table->string('billing_cycle'); // 'monthly', 'yearly', etc.
            $table->integer('categories')->nullable(); // Max number of notes allowed
            $table->integer('note_limit_by_category')->nullable(); // Max number of notes allowed
            $table->boolean('collaboration')->default(false);
            $table->boolean('file_attachments')->default(false);
            $table->boolean('priority_support')->default(false);
            $table->json('features')->nullable(); // Additional features as JSON
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
