<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Health check — test from React with: fetch('http://127.0.0.1:8000/api/ping')
Route::get('/ping', fn () => response()->json(['message' => 'Laravel API is connected!']));

// Example: GET /api/applications  (replace with real controller later)
Route::get('/applications', function () {
    return response()->json([
        'data' => [
            [
                "id" => 1,
                "company" => "Google",
                "position" => "Software Engineer",
                "status" => "Interview",
                "date" => "2023-01-15",
                "jobLink" => "https://google.com/jobs/123",
                "notes" => "Friendly team, modern office."
            ],
            [
                "id" => 2,
                "company" => "Microsoft",
                "position" => "Software Engineer",
                "status" => "Applied",
                "date" => "2023-01-10",
                "jobLink" => "https://microsoft.com/careers",
                "notes" => "Good benefits package."
            ]
        ],
        'message' => 'Applications endpoint ready.',
    ]);
});
