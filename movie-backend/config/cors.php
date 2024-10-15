<?php

use Illuminate\Support\Str;

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'profile', 'movies'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => false,

    'max_age' => 0,

    'supports_credentials' => false,
];
