import React from 'react';
import { MapPin, Guitar as Hospital, ChevronFirst as FirstAid } from 'lucide-react';

const NearbyCare: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        <MapPin className="inline-block mr-2 text-blue-600" />
        Nearby Healthcare Facilities
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Hospitals Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Hospital className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Hospitals</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium text-gray-900">City General Hospital</h3>
              <p className="text-gray-600 text-sm mt-1">2.3 miles away</p>
              <p className="text-gray-600 text-sm">Open 24/7</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium text-gray-900">Memorial Medical Center</h3>
              <p className="text-gray-600 text-sm mt-1">3.1 miles away</p>
              <p className="text-gray-600 text-sm">Open 24/7</p>
            </div>
          </div>
        </div>

        {/* Urgent Care Centers */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <FirstAid className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Urgent Care</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium text-gray-900">Downtown Urgent Care</h3>
              <p className="text-gray-600 text-sm mt-1">1.5 miles away</p>
              <p className="text-gray-600 text-sm">8:00 AM - 8:00 PM</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium text-gray-900">Express Care Clinic</h3>
              <p className="text-gray-600 text-sm mt-1">2.8 miles away</p>
              <p className="text-gray-600 text-sm">9:00 AM - 7:00 PM</p>
            </div>
          </div>
        </div>

        {/* Pharmacies */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <MapPin className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Pharmacies</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium text-gray-900">Community Pharmacy</h3>
              <p className="text-gray-600 text-sm mt-1">0.8 miles away</p>
              <p className="text-gray-600 text-sm">8:00 AM - 10:00 PM</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium text-gray-900">24/7 Drugstore</h3>
              <p className="text-gray-600 text-sm mt-1">1.2 miles away</p>
              <p className="text-gray-600 text-sm">Open 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearbyCare;