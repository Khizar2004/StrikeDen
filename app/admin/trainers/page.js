'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function TrainerList() {
  const [trainers, setTrainers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Fetch trainers with error handling
  const fetchTrainers = async () => {
    try {
      const response = await fetch('/api/trainers');
      const data = await response.json();
      if (data.success) setTrainers(data.data);
    } catch (error) {
      toast.error('Failed to load trainers');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete with confirmation dialog
  const handleDelete = async (trainerId) => {
    if (!confirm('Permanently delete this trainer?')) return;
    
    try {
      const response = await fetch(`/api/trainers/${trainerId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Trainer deleted');
        fetchTrainers(); // Refresh list
      }
    } catch (error) {
      toast.error('Deletion failed');
    }
  };

  useEffect(() => { fetchTrainers(); }, []);

  // Filtered trainers list
  const filteredTrainers = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Trainer Management</h1>
        
        <div className="w-full md:w-auto flex gap-4">
          <input
            type="text"
            placeholder="Search trainers..."
            className="flex-1 p-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => router.push('/admin/trainers/new')}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Add Trainer
          </button>
        </div>
      </div>

      {/* Trainers Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Specialization</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Experience</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTrainers.map((trainer) => (
              <tr key={trainer._id}>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <span className="font-medium">{trainer.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">{trainer.specialization}</td>
                <td className="px-4 py-4 whitespace-nowrap">{trainer.experience} years</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    trainer.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {trainer.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => router.push(`/admin/trainers/${trainer._id}`)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(trainer._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredTrainers.length === 0 && (
          <div className="text-center py-8 bg-gray-50">
            <p className="text-gray-500">No trainers found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
} 