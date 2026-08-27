<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    //

     public function index(): Response
    {
        return Inertia::render('welcome', [
            'seo' => [
                'title' => 'Kadogo — Reconcile Your M-Pesa Till Automatically',
                'description' => 'Kadogo watches your till so you never miss a shilling. '
                    .'Automatic M-Pesa reconciliation for kiosks and small shops in Kenya — '
                    .'no duplicate counts, no spreadsheets, no missed SMS.',
                'canonical' => route('home')               
            ],
        ]);
    }
}
