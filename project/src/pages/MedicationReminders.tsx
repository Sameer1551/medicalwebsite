import React, { useState } from 'react';
import { Plus, Bell, Clock, Calendar, Check, Trash2, Settings, PlusCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  time: string[];
  days: string[];
  notes?: string;
  color: string;
}

const MedicationReminders: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: 1,
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Daily',
      time: ['8:00 AM'],
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      color: 'blue'
    },
    {
      id: 2,
      name: 'Ibuprofen',
      dosage: '400mg',
      frequency: 'As needed',
      time: ['9:00 AM', '9:00 PM'],
      days: ['Monday', 'Wednesday', 'Friday'],
      notes: 'Take with food',
      color: 'green'
    },
    {
      id: 3,
      name: 'Vitamin D',
      dosage: '2000 IU',
      frequency: 'Daily',
      time: ['8:00 AM'],
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      color: 'yellow'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedication, setNewMedication] = useState<Partial<Medication>>({
    name: '',
    dosage: '',
    frequency: 'Daily',
    time: ['8:00 AM'],
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    color: 'blue'
  });

  const timeOptions = [
    '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM',
    '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'
  ];

  const dayOptions = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const colorOptions = [
    { name: 'blue', color: 'bg-blue-500' },
    { name: 'green', color: 'bg-green-500' },
    { name: 'red', color: 'bg-red-500' },
    { name: 'yellow', color: 'bg-yellow-500' },
    { name: 'purple', color: 'bg-purple-500' }
  ];

  const handleAddMedication = () => {
    if (!newMedication.name || !newMedication.dosage) return;
    
    const newMed: Medication = {
      id: Date.now(),
      name: newMedication.name,
      dosage: newMedication.dosage,
      frequency: newMedication.frequency || 'Daily',
      time: newMedication.time || ['8:00 AM'],
      days: newMedication.days || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      notes: newMedication.notes,
      color: newMedication.color || 'blue'
    };
    
    setMedications([...medications, newMed]);
    setNewMedication({
      name: '',
      dosage: '',
      frequency: 'Daily',
      time: ['8:00 AM'],
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      color: 'blue'
    });
    setShowAddForm(false);
  };

  const handleDeleteMedication = (id: number) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const handleToggleTime = (timeOption: string) => {
    if (!newMedication.time) return;
    
    const newTimes = [...newMedication.time];
    
    if (newTimes.includes(timeOption)) {
      const index = newTimes.indexOf(timeOption);
      newTimes.splice(index, 1);
    } else {
      newTimes.push(timeOption);
    }
    
    setNewMedication({...newMedication, time: newTimes});
  };

  const handleToggleDay = (dayOption: string) => {
    if (!newMedication.days) return;
    
    const newDays = [...newMedication.days];
    
    if (newDays.includes(dayOption)) {
      const index = newDays.indexOf(dayOption);
      newDays.splice(index, 1);
    } else {
      newDays.push(dayOption);
    }
    
    setNewMedication({...newMedication, days: newDays});
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Medication Reminders</h1>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          leftIcon={<Plus size={16} />}
        >
          Add Medication
        </Button>
      </div>
      
      {showAddForm && (
        <Card className="mb-6">
          <h2 className="text-lg font-medium mb-4">Add New Medication</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medication Name*
              </label>
              <input
                type="text"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., Lisinopril"
                value={newMedication.name}
                onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dosage*
              </label>
              <input
                type="text"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., 10mg"
                value={newMedication.dosage}
                onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frequency
              </label>
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={newMedication.frequency}
                onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="As needed">As needed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color Label
              </label>
              <div className="flex space-x-2">
                {colorOptions.map((colorOption) => (
                  <button
                    key={colorOption.name}
                    className={`w-6 h-6 rounded-full ${colorOption.color} ${
                      newMedication.color === colorOption.name ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                    }`}
                    onClick={() => setNewMedication({...newMedication, color: colorOption.name})}
                    aria-label={`Set color to ${colorOption.name}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reminder Times
            </label>
            <div className="flex flex-wrap gap-2">
              {timeOptions.map((timeOption) => (
                <button
                  key={timeOption}
                  className={`py-1 px-3 text-sm rounded-full border ${
                    newMedication.time?.includes(timeOption)
                      ? 'bg-primary-50 border-primary-300 text-primary-700'
                      : 'border-gray-300 text-gray-700 hover:border-primary-300'
                  }`}
                  onClick={() => handleToggleTime(timeOption)}
                >
                  {timeOption}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Days
            </label>
            <div className="flex flex-wrap gap-2">
              {dayOptions.map((dayOption) => (
                <button
                  key={dayOption}
                  className={`py-1 px-3 text-sm rounded-full border ${
                    newMedication.days?.includes(dayOption)
                      ? 'bg-primary-50 border-primary-300 text-primary-700'
                      : 'border-gray-300 text-gray-700 hover:border-primary-300'
                  }`}
                  onClick={() => handleToggleDay(dayOption)}
                >
                  {dayOption.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (optional)
            </label>
            <textarea
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              rows={2}
              placeholder="Any special instructions"
              value={newMedication.notes || ''}
              onChange={(e) => setNewMedication({...newMedication, notes: e.target.value})}
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddMedication}
              disabled={!newMedication.name || !newMedication.dosage}
            >
              Add Medication
            </Button>
          </div>
        </Card>
      )}
      
      <div className="bg-primary-50 rounded-xl p-5 mb-6">
        <h2 className="flex items-center text-lg font-medium text-primary-800 mb-3">
          <Bell className="mr-2 h-5 w-5 text-primary-600" />
          Today's Schedule
        </h2>
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 border border-primary-100 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-500 w-3 h-12 rounded-full mr-4"></div>
              <div>
                <p className="font-medium">8:00 AM</p>
                <p className="text-gray-600">Lisinopril (10mg)</p>
              </div>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Check className="h-5 w-5 text-gray-400 hover:text-green-500" />
            </button>
          </div>
          <div className="bg-white rounded-lg p-4 border border-primary-100 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-green-500 w-3 h-12 rounded-full mr-4"></div>
              <div>
                <p className="font-medium">9:00 AM</p>
                <p className="text-gray-600">Ibuprofen (400mg)</p>
              </div>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Check className="h-5 w-5 text-gray-400 hover:text-green-500" />
            </button>
          </div>
          <div className="bg-white rounded-lg p-4 border border-primary-100 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-yellow-500 w-3 h-12 rounded-full mr-4"></div>
              <div>
                <p className="font-medium">8:00 AM</p>
                <p className="text-gray-600">Vitamin D (2000 IU)</p>
              </div>
            </div>
            <button className="p-2 rounded-full bg-gray-100">
              <Check className="h-5 w-5 text-green-500" />
            </button>
          </div>
          <div className="bg-white rounded-lg p-4 border border-primary-100 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-green-500 w-3 h-12 rounded-full mr-4"></div>
              <div>
                <p className="font-medium">9:00 PM</p>
                <p className="text-gray-600">Ibuprofen (400mg)</p>
              </div>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Check className="h-5 w-5 text-gray-400 hover:text-green-500" />
            </button>
          </div>
        </div>
      </div>
      
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Your Medications</h2>
          <Button 
            variant="outline" 
            size="sm"
            leftIcon={<Settings size={16} />}
          >
            Settings
          </Button>
        </div>
        
        {medications.length > 0 ? (
          <div className="space-y-4">
            {medications.map((medication) => (
              <div key={medication.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex items-center p-4">
                  <div className={`bg-${medication.color}-500 w-3 h-12 rounded-full mr-4`}></div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium">{medication.name}</h3>
                        <p className="text-gray-600">{medication.dosage}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteMedication(medication.id)}
                        className="text-gray-400 hover:text-red-500 p-1"
                        aria-label="Delete medication"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center mt-2 text-sm text-gray-500">
                      <div className="flex items-center mr-4">
                        <Clock size={14} className="mr-1" />
                        {medication.time.join(', ')}
                      </div>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {medication.frequency}
                      </div>
                    </div>
                    {medication.notes && (
                      <p className="mt-2 text-sm text-gray-600 italic">{medication.notes}</p>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-2 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {medication.days.map((day) => (
                      <span 
                        key={day} 
                        className="inline-block text-xs px-2 py-1 bg-white rounded border border-gray-200"
                      >
                        {day.slice(0, 3)}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary-600"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-3">No medications added yet</p>
            <Button
              onClick={() => setShowAddForm(true)}
              leftIcon={<PlusCircle size={16} />}
            >
              Add Your First Medication
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MedicationReminders;