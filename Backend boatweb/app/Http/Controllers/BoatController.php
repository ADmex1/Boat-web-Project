<?php

namespace App\Http\Controllers;

use App\Models\Boat;
use Illuminate\Http\Request;

class BoatController extends Controller
{
    public function index()
    {
        $boats = Boat::with('reviews')->get();
        return response()->json([
            'status' => 'success',
            'boats' => $boats
        ]);
    }

    public function show($id)
    {
        $boat = Boat::with('reviews')->findOrFail($id);
        return response()->json([
            'status' => 'success',
            'boat' => $boat
        ]);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'required|string'
        ]);

        $boat = Boat::create($request->all());
        return response()->json([
            'status' => 'success',
            'message' => 'Boat created successfully',
            'boat' => $boat
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $boat = Boat::findOrFail($id);
        $boat->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Boat updated successfully',
            'boat' => $boat
        ]);
    }

    public function destroy($id)
    {
        $boat = Boat::findOrFail($id);
        $boat->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Boat deleted successfully'
        ]);
    }
}
