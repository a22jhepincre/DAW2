<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    //
    public function index()
    {
        $plans = Plan::all();
        return view('Plans.plan', compact('plans'));
    }
}
