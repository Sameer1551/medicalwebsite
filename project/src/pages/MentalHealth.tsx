import React from 'react';

const MentalHealth = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mental Health Resources</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">24/7 Support</h2>
          <p className="text-gray-600">
            Access to mental health professionals and resources available around the clock.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Self-Help Tools</h2>
          <p className="text-gray-600">
            Guided meditation, breathing exercises, and stress management techniques.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Find a Therapist</h2>
          <p className="text-gray-600">
            Connect with licensed mental health professionals in your area.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentalHealth;