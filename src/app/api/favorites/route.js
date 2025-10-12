export async function GET(request) {
  try {
    // Database not configured - returning empty favorites
    return Response.json({ favorites: [] });
  } catch (error) {
    console.error('Get favorites error:', error);
    return Response.json(
      { error: 'Failed to get favorite locations' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Database not configured - favorites feature disabled
    return Response.json({
      success: false,
      error: 'Favorites feature requires database configuration'
    }, { status: 503 });
  } catch (error) {
    console.error('Add favorite error:', error);
    return Response.json(
      { error: 'Failed to add favorite location' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    // Database not configured - favorites feature disabled
    return Response.json({
      success: false,
      error: 'Favorites feature requires database configuration'
    }, { status: 503 });
  } catch (error) {
    console.error('Delete favorite error:', error);
    return Response.json(
      { error: 'Failed to delete favorite location' },
      { status: 500 }
    );
  }
}