<?php

namespace Database\Seeders;

use App\Models\Movie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MovieSeeder extends Seeder
{
    public function run()
    {
        Movie::create([
            'name' => 'Inception',
            'genre' => 'Science Fiction',
            'year' => '2010',
            'cover_photo' => 'https://d1fufvy4xao6k9.cloudfront.net/images/blog/posts/2024/01/screenshot_14.jpg',
            'summary' => 'A skilled thief is given a chance at redemption...',
        ]);

        Movie::create([
            'name' => 'Titanic',
            'genre' => 'Romance/Drama',
            'year' => '1997',
            'cover_photo' => 'https://cdn.vox-cdn.com/thumbor/6I5ODfKkz-shr9-85Ui7R9In2tk=/0x0:2970x1338/1120x0/filters:focal(0x0:2970x1338):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/24422158/Screenshot_2023_02_08_at_11.50.29_AM.png',
            'summary' => 'A love story that transcends tragedy...',
        ]);

        Movie::create([
            'name' => 'Deadpool',
            'genre' => 'Drama',
            'year' => '2024',
            'cover_photo' => 'https://cdn.vox-cdn.com/thumbor/6I5ODfKkz-shr9-85Ui7R9In2tk=/0x0:2970x1338/1120x0/filters:focal(0x0:2970x1338):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/24422158/Screenshot_2023_02_08_at_11.50.29_AM.png',
            'summary' => 'A love story that transcends tragedy...',
        ]);

        Movie::create([
            'name' => 'MJ',
            'genre' => 'Bio',
            'year' => '2024',
            'cover_photo' => 'https://upload.wikimedia.org/wikipedia/en/4/43/Michael_Jackson%27s_This_Is_It_Poster.JPG',
            'summary' => 'A love story that transcends tragedy...',
        ]);

        Movie::create([
            'name' => 'Horizont',
            'genre' => 'Romance/Drama',
            'year' => '1997',
            'cover_photo' => 'https://upload.wikimedia.org/wikipedia/en/4/43/Michael_Jackson%27s_This_Is_It_Poster.JPG',
            'summary' => 'A love story that transcends tragedy...',
        ]);

        Movie::create([
            'name' => 'Beauty',
            'genre' => 'Romance/Drama',
            'year' => '2011',
            'cover_photo' => 'https://upload.wikimedia.org/wikipedia/en/4/43/Michael_Jackson%27s_This_Is_It_Poster.JPG',
            'summary' => 'A love story that transcends tragedy...',
        ]);

        Movie::create([
            'name' => 'Joker',
            'genre' => 'Romance',
            'year' => '2005',
            'cover_photo' => 'https://d1fufvy4xao6k9.cloudfront.net/images/blog/posts/2024/01/screenshot_14.jpg',
            'summary' => 'A love story that transcends tragedy...',
        ]);
    }
}
