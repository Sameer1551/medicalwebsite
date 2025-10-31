import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, User, Filter, Search } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  availability: string[];
  location: string;
  image: string;
}

const specialties = [
  'Family Medicine', 'Cardiology', 'Dermatology', 'Orthopedics',
  'Pediatrics', 'Neurology', 'Gynecology', 'Ophthalmology'
];

const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Family Medicine',
    rating: 4.8,
    availability: ['Mon, Wed: 9AM - 5PM', 'Tue, Thu: 10AM - 6PM'],
    location: 'Downtown Medical Center',
    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    rating: 4.9,
    availability: ['Mon, Wed, Fri: 8AM - 4PM', 'Tue: 11AM - 7PM'],
    location: 'Heart & Vascular Institute',
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Dermatology',
    rating: 4.7,
    availability: ['Mon-Thu: 9AM - 5PM', 'Fri: 9AM - 2PM'],
    location: 'Skin Health Center',
    image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    rating: 4.6,
    availability: ['Mon, Wed, Fri: 8AM - 6PM'],
    location: 'Joint & Spine Center',
    image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

const AppointmentBooking: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const availableDates = ['Mon, Jun 24', 'Tue, Jun 25', 'Wed, Jun 26', 'Thu, Jun 27', 'Fri, Jun 28'];
  const availableTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === null || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const selectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setStep(2);
  };

  const bookAppointment = () => {
    // In a real app, this would send the booking to the backend
    alert(`Appointment booked with ${selectedDoctor?.name} on ${selectedDate} at ${selectedTime}`);
    resetForm();
  };

  const resetForm = () => {
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Book an Appointment</h1>
      
      {step === 1 ? (
        <>
          <Card className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-grow relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Search by doctor name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <select
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
                  value={selectedSpecialty || ''}
                  onChange={(e) => setSelectedSpecialty(e.target.value || null)}
                >
                  <option value="">All Specialties</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <div 
                    key={doctor.id} 
                    className="flex flex-col md:flex-row border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors cursor-pointer"
                    onClick={() => selectDoctor(doctor)}
                  >
                    <div className="md:w-1/6 mb-4 md:mb-0 flex justify-center">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name} 
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    </div>
                    <div className="md:w-3/6 md:px-4">
                      <h3 className="font-semibold text-lg">{doctor.name}</h3>
                      <p className="text-primary-600">{doctor.specialty}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(doctor.rating)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-1">{doctor.rating}</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <MapPin size={16} className="text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">{doctor.location}</span>
                      </div>
                    </div>
                    <div className="md:w-2/6">
                      <p className="text-sm font-medium text-gray-700 mb-1">Availability:</p>
                      {doctor.availability.map((time, index) => (
                        <div key={index} className="text-sm text-gray-600 flex items-center">
                          <Clock size={14} className="mr-1 text-gray-400" />
                          {time}
                        </div>
                      ))}
                      <Button 
                        className="mt-3 w-full md:w-auto"
                        size="sm"
                      >
                        Book Appointment
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">No doctors found matching your search criteria.</p>
                </div>
              )}
            </div>
          </Card>
        </>
      ) : (
        <Card>
          <div className="flex items-center mb-6">
            <button
              onClick={resetForm}
              className="mr-4 text-primary-600 hover:text-primary-700"
            >
              &larr; Back to doctors
            </button>
            <h2 className="text-xl font-semibold">Schedule an Appointment</h2>
          </div>
          
          {selectedDoctor && (
            <div className="flex flex-col md:flex-row mb-6 pb-6 border-b border-gray-200">
              <div className="md:w-1/4 mb-4 md:mb-0 flex justify-center">
                <img 
                  src={selectedDoctor.image} 
                  alt={selectedDoctor.name} 
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
              <div className="md:w-3/4">
                <h3 className="font-semibold text-lg">{selectedDoctor.name}</h3>
                <p className="text-primary-600">{selectedDoctor.specialty}</p>
                <div className="flex items-center mt-2">
                  <MapPin size={16} className="text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">{selectedDoctor.location}</span>
                </div>
                <div className="mt-2 space-y-1">
                  {selectedDoctor.availability.map((time, index) => (
                    <div key={index} className="text-sm text-gray-600 flex items-center">
                      <Clock size={14} className="mr-1 text-gray-400" />
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-3 flex items-center">
              <CalendarIcon size={18} className="mr-2 text-primary-600" />
              Select a Date
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {availableDates.map((date) => (
                <button
                  key={date}
                  className={`py-2 px-4 rounded-md border ${
                    selectedDate === date
                      ? 'bg-primary-50 border-primary-300 text-primary-700'
                      : 'border-gray-300 hover:border-primary-300'
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-3 flex items-center">
              <Clock size={18} className="mr-2 text-primary-600" />
              Select a Time
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  className={`py-2 px-4 rounded-md border ${
                    selectedTime === time
                      ? 'bg-primary-50 border-primary-300 text-primary-700'
                      : 'border-gray-300 hover:border-primary-300'
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-3 flex items-center">
              <User size={18} className="mr-2 text-primary-600" />
              Your Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Visit
                </label>
                <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                  <option>Regular checkup</option>
                  <option>New condition</option>
                  <option>Follow-up</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (optional)
                </label>
                <textarea 
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  rows={2}
                  placeholder="Any specific concerns or information for the doctor"
                ></textarea>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button
              onClick={bookAppointment}
              disabled={!selectedDate || !selectedTime}
            >
              Confirm Appointment
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AppointmentBooking;