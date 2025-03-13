import { connectDB } from "@/lib/dbConnect";
import Trainer from "@/lib/Trainer";

export async function GET() {
  try {
    await connectDB();

  // Hard-coded trainer data
    const trainers = [
      {
        name: "Jane Smith",
        specialization: "Strength Training",
        experience: 8,
        image: "https://example.com/jane-smith.jpg",
      },
      {
        name: "Mike Tyson",
        specialization: "Boxing Coach",
        experience: 12,
        image: "https://example.com/mike-tyson.jpg",
      },
    ];

    await Trainer.insertMany(trainers);
    return Response.json({ success: true, message: "Trainers added!" });
  } catch (error) {
    console.error("Error seeding trainers:", error);
    return Response.json({ success: false, message: "Failed to seed trainers" });
  }
}
