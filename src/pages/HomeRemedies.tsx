import React from 'react';

const HomeRemedies: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Home Remedies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder content - you can customize this based on your needs */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">Common Cold</h2>
          <ul className="space-y-2">
            <li>• Honey and warm water for sore throat</li>
            <li>• Steam inhalation for congestion</li>
            <li>• Rest and hydration</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">Headache</h2>
          <ul className="space-y-2">
            <li>• Cold or warm compress</li>
            <li>• Stay in a quiet, dark room</li>
            <li>• Gentle neck stretches</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">Upset Stomach</h2>
          <ul className="space-y-2">
            <li>• Ginger tea</li>
            <li>• BRAT diet (Bananas, Rice, Applesauce, Toast)</li>
            <li>• Peppermint for nausea</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeRemedies;