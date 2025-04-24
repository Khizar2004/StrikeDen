export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    // Extract id after awaiting params
    const id = params.id;
    
    if (!ObjectId.isValid(id)) {
      return Response.json(
        { success: false, error: "Invalid trainer ID" },
        { status: 400 }
      );
    }

    // Find the trainer first to make sure it exists
    const trainer = await Trainer.findById(id);
    
    if (!trainer) {
      return Response.json(
        { success: false, error: "Trainer not found" },
        { status: 404 }
      );
    }

    // Rest of the code...
  } catch (error) {
    // Error handling...
  }
} 