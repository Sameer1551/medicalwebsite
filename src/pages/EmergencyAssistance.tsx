import React, { useState, useEffect } from 'react';
import { Phone, Navigation, Ambulance, Heart, AlertTriangle } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const EmergencyAssistance: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [nearbyHospitals] = useState([
    {
      name: 'City General Hospital',
      distance: '2.3 miles',
      address: '123 Medical Ave, Cityville',
      phone: '(555) 123-4567',
      emergency: true
    },
    {
      name: 'Westside Medical Center',
      distance: '3.5 miles',
      address: '456 Health Blvd, Cityville',
      phone: '(555) 987-6543',
      emergency: true
    },
    {
      name: 'Eastside Urgent Care',
      distance: '1.8 miles',
      address: '789 Urgent St, Cityville',
      phone: '(555) 456-7890',
      emergency: false
    }
  ]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Unable to retrieve your location. Please enable location services.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }
  }, []);

  const emergencyActions = [
    { 
      title: 'Call Emergency Services', 
      description: 'Connect directly to 911 emergency services',
      icon: <Phone size={24} className="text-red-600" />,
      action: () => window.location.href = 'tel:911',
      variant: 'danger'
    },
    { 
      title: 'Navigate to Nearest Hospital', 
      description: 'Get directions to the closest emergency room',
      icon: <Navigation size={24} className="text-primary-600" />,
      action: () => {},
      variant: 'primary'
    },
    { 
      title: 'Request Ambulance', 
      description: 'Send your location and request an ambulance',
      icon: <Ambulance size={24} className="text-amber-600" />,
      action: () => {},
      variant: 'secondary'
    }
  ];

  const firstAidGuides = [
    {
      title: 'Heart Attack',
      icon: <Heart size={20} className="text-red-600" />
    },
    {
      title: 'Choking',
      icon: <AlertTriangle size={20} className="text-amber-600" />
    },
    {
      title: 'Severe Bleeding',
      icon: <AlertTriangle size={20} className="text-red-600" />
    },
    {
      title: 'Stroke',
      icon: <AlertTriangle size={20} className="text-purple-600" />
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-red-600 text-white rounded-xl p-6 mb-8">
        <h1 className="text-2xl font-bold mb-2">Emergency Assistance</h1>
        <p className="text-red-100">
          Quick access to emergency services and nearby hospitals. For life-threatening emergencies, call 911 immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {emergencyActions.map((action, index) => (
          <Card key={index} className="flex flex-col h-full">
            <div className="flex items-center mb-4">
              <div className={`rounded-full p-2 ${
                action.variant === 'danger' ? 'bg-red-100' : 
                action.variant === 'primary' ? 'bg-primary-100' : 'bg-secondary-100'
              }`}>
                {action.icon}
              </div>
              <h2 className="text-lg font-semibold ml-3">{action.title}</h2>
            </div>
            <p className="text-gray-600 mb-4 flex-grow">{action.description}</p>
            <Button 
              onClick={action.action}
              variant={action.variant === 'danger' ? 'danger' : action.variant === 'primary' ? 'primary' : 'secondary'}
              fullWidth
            >
              {action.title}
            </Button>
          </Card>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Nearby Emergency Facilities</h2>
        
        {locationError && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded mb-4">
            {locationError}
          </div>
        )}
        
        <div className="bg-gray-100 rounded-lg h-48 mb-4 flex items-center justify-center">
          <p className="text-gray-500">{location ? 'Map view would display here' : 'Loading map...'}</p>
        </div>
        
        <div className="space-y-3">
          {nearbyHospitals.map((hospital, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                    {hospital.emergency && (
                      <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded">
                        Emergency
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">{hospital.address}</p>
                  <p className="text-gray-500 text-sm">{hospital.distance} away</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    leftIcon={<Phone size={16} />}
                    onClick={() => window.location.href = `tel:${hospital.phone.replace(/[^0-9]/g, '')}`}
                  >
                    Call
                  </Button>
                  <Button 
                    size="sm"
                    leftIcon={<Navigation size={16} />}
                  >
                    Directions
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Emergency First Aid Guides</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {firstAidGuides.map((guide, index) => (
            <Card 
              key={index} 
              className="text-center hover:border-primary-300 border border-transparent cursor-pointer"
              hover={true}
            >
              <div className="flex flex-col items-center">
                <div className="mb-2">{guide.icon}</div>
                <h3 className="font-medium">{guide.title}</h3>
                <p className="text-xs text-gray-500 mt-1">View guide</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="font-semibold text-red-800 mb-2">Important Notice</h3>
        <p className="text-red-700 text-sm">
          This emergency assistance feature is not a substitute for professional emergency services. 
          In case of a life-threatening emergency, immediately call your local emergency number (911 in the US) 
          rather than relying on this application.
        </p>
      </div>
    </div>
  );
};

export default EmergencyAssistance;