<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\boats;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function index($boatId)
    {
        // Pastikan boat exists
        $boat = boats::findOrFail($boatId);
        
        $reviews = Review::with('user')
            ->where('boat_id', $boatId)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($reviews);
    }

    public function store(Request $request, $boatId)
    {
        // Pastikan boat exists
        $boat = boats::findOrFail($boatId);

        // Validasi input
        $this->validate($request, [
            'comment' => 'required|string',
            'rating' => 'required|integer|min:1|max:5'
        ]);

        // Buat review baru
        $review = new Review();
        $review->user_id = Auth::id();
        $review->boat_id = $boatId;
        $review->comment = $request->comment;
        $review->rating = $request->rating;
        $review->save();

        // Load user relationship untuk response
        $review->load('user');

        return response()->json([
            'status' => 'success',
            'message' => 'Review posted successfully',
            'review' => $review
        ], 201);
    }

    public function update(Request $request, $id)
    {
        try {
            // Cari review berdasarkan ID
            $review = Review::findOrFail($id);

            // Cek apakah review milik user yang sedang login
            if ($review->user_id !== Auth::id()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized - You can only edit your own review'
                ], 403);
            }

            // Validasi input
            $this->validate($request, [
                'comment' => 'required|string',
                'rating' => 'required|integer|min:1|max:5'
            ]);

            // Update review
            $review->update([
                'comment' => $request->comment,
                'rating' => $request->rating
            ]);

            // Load user relationship untuk response
            $review->load('user');

            return response()->json([
                'status' => 'success',
                'message' => 'Review updated successfully',
                'review' => $review
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update review: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            // Cari review berdasarkan ID
            $review = Review::findOrFail($id);

            // Cek apakah review milik user yang sedang login
            if ($review->user_id !== Auth::id()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized - You can only delete your own review'
                ], 403);
            }

            // Hapus review
            $review->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Review deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete review: ' . $e->getMessage()
            ], 500);
        }
    }
}
