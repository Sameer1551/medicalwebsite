import React, { useState } from 'react';
import { FlaskRound as Flask, Calendar, Clock, MapPin, FileText, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

interface LabTest {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: string;
  preparation: string[];
}

const labTests: LabTest[] = [
  {
    id: 1,
    name: 'Complete Blood Count (CBC)',
    description: 'Measures different components of your blood including red cells, white cells, and platelets',
    price: '$45',
    duration: '15-30 minutes',
    preparation: [
      'Fast for 8-12 hours before the test',
      'Drink plenty of water',
      'Avoid strenuous exercise 24 hours before'
    ]
  },
  {
    id: 2,
    name: 'Comprehensive Metabolic Panel',
    description: 'Measures various chemicals in the blood to check liver and kidney function',
    price: '$65',
    duration: '20-30 minutes',
    preparation: [
      'Fast for 10-12 hours before the test',
      'Take medications as prescribed',
      'Avoid alcohol 24 hours before'
    ]
  },
  {
    id: 3,
    name: 'Lipid Panel',
    description: 'Measures cholesterol and triglycerides to assess heart health',
    price: '$55',
    duration: '15-20 minutes',
    preparation: [
      'Fast for 12 hours before the test',
      'Avoid fatty foods 24 hours before',
      'Continue regular medications unless instructed otherwise'
    ]
  },
  {
    id: 4,
    name: 'Thyroid Function Test',
    description: 'Checks how well your thyroid gland is working',
    price: '$75',
    duration: '15-20 minutes',
    preparation: [
      'No special preparation needed',
      'Inform about medications',
      'Best taken in the morning'
    ]
  }
];

const locations = [
  {
    name: 'Central Lab Facility',
    address: '123 Medical Center Dr',
    distance: '2.3 miles',
    availability: 'Mon-Sat: 7AM-7PM'
  },
  {
    name: 'Downtown Diagnostic Center',
    address: '456 Health Blvd',
    distance: '3.5 miles',
    availability: 'Mon-Fri: 8AM-6PM'
  },
  {
    name: 'Westside Medical Lab',
    address: '789 Care Lane',
    distance: '4.1 miles',
    availability: 'Mon-Sun: 24 hours'
  }
];

const LabTests: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleBookTest = (test: LabTest) => {
    setSelectedTest(test);
    setShowBookingForm(true);
  };

  const handleSubmitBooking = () => {
    // In a real app, this would submit the booking to a backend
    alert('Lab test booked successfully!');
    setShowBookingForm(false);
    setSelectedTest(null);
    setSelectedLocation('');
    setSelectedDate('');
    setSelectedTime('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Lab Tests</h1>
          <p className="text-gray-600 mt-1">Book your lab tests and manage results</p>
        </div>
        <Button
          variant="outline"
          leftIcon={<FileText size={16} />}
        >
          View Past Results
        </Button>
      </div>

      {!showBookingForm ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {labTests.map((test) => (
              <Card key={test.id} className="flex flex-col h-full">
                <div className="flex items-start mb-4">
                  <div className="bg-primary-50 p-3 rounded-lg">
                    <Flask className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">{test.name}</h3>
                    <p className="text-primary-600 font-medium">{test.price}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 flex-grow">{test.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    Duration: {test.duration}
                  </div>
                </div>
                
                <Button
                  onClick={() => handleBookTest(test)}
                  fullWidth
                >
                  Book Test
                </Button>
              </Card>
            ))}
          </div>

          <Card>
            <div className="flex items-center mb-4">
              <AlertCircle className="h-5 w-5 text-primary-600 mr-2" />
              <h2 className="text-lg font-medium">Important Information</h2>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Bring a valid ID and insurance card if applicable
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Results are typically available within 24-48 hours
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Some tests require specific preparation - follow instructions carefully
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Contact your doctor before canceling any prescribed tests
              </li>
            </ul>
          </Card>
        </div>
      ) : (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Book Lab Test</h2>
            <button
              onClick={() => setShowBookingForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>

          {selectedTest && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-800">{selectedTest.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{selectedTest.description}</p>
              <div className="mt-3">
                <h4 className="font-medium text-gray-800 mb-2">Preparation Instructions:</h4>
                <ul className="space-y-1">
                  {selectedTest.preparation.map((instruction, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="mr-2">•</span>
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Location
              </label>
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">Choose a location</option>
                {locations.map((location, index) => (
                  <option key={index} value={location.name}>
                    {location.name} ({location.distance})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Date
              </label>
              <input
                type="date"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Time
              </label>
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Choose a time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
              </select>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleSubmitBooking}
                disabled={!selectedLocation || !selectedDate || !selectedTime}
                fullWidth
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </Card>
      )}

      {!showBookingForm && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Lab Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {locations.map((location, index) => (
              <Card key={index}>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary-600 mt-1 mr-2" />
                  <div>
                    <h3 className="font-medium text-gray-800">{location.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{location.address}</p>
                    <p className="text-sm text-gray-500 mt-1">{location.distance}</p>
                    <p className="text-sm text-primary-600 mt-2">{location.availability}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LabTests;