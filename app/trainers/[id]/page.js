"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TrainerProfile() {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    async function fetchTrainer() {
      try {
        const response = await fetch(`/api/trainers/${id}`);
        const data = await response.json();
        if (data.success) {
          setTrainer(data.data);
        }
      } catch (error) {
        console.error("Error fetching trainer:", error);
      }
    }
    if (id) fetchTrainer();
  }, [id]);

  if (!trainer) return <p className="text-center text-gray-400 mt-10">Loading trainer details...</p>;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center py-16 px-6">
      <div className="max-w-3xl text-center">
        <img
          src={trainer.image || "https://via.placeholder.com/150"}
          alt={trainer.name}
          className="w-48 h-48 object-cover rounded-full mx-auto mb-6"
        />
        <h1 className="text-4xl font-bold">{trainer.name}</h1>
        <p className="text-xl text-gray-400 mt-2">{trainer.specialization}</p>
        <p className="text-gray-500 mt-4">Experience: {trainer.experience} years</p>
        <p className="mt-6 text-gray-300">{trainer.bio || "No bio available."}</p>
      </div>
    </main>
  );
}
