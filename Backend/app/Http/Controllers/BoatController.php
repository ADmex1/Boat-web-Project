<?php

namespace App\Http\Controllers;

use App\Models\Boats;
use Illuminate\Http\Request;

class BoatController extends Controller
{
    public function index()
    {
        $boats = Boats::with('reviews')->get();
        return response()->json([
            'status' => 'success',
            'boats' => $boats
        ]);
    }

    public function show($id)
    {
        $boat = Boats::with('reviews')->findOrFail($id);
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

        $boat = Boats::create($request->all());
        return response()->json([
            'status' => 'success',
            'message' => 'Boat created successfully',
            'boat' => $boat
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $boat = Boats::findOrFail($id);
        $boat->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Boat updated successfully',
            'boat' => $boat
        ]);
    }

    public function destroy($id)
    {
        $boat = Boats::findOrFail($id);
        $boat->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Boat deleted successfully'
        ]);
    }
}
