<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        DB::statement('PRAGMA foreign_keys = OFF;');
        User::truncate();
        DB::statement('PRAGMA foreign_keys = ON;');

        User::create([
            'username' => 'testuser',
            'full_name' => 'Test User',
            'email' => 'testuser@example.com',
            'password' => Hash::make('password123'),
            'name' => 'Test User',
        ]);
    }
}
