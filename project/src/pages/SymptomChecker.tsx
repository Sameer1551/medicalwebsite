import React, { useState } from 'react';
import { Search, CheckCircle, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const symptoms = [
  'Headache', 'Fever', 'Cough', 'Fatigue', 'Shortness of breath',
  'Nausea', 'Dizziness', 'Sore throat', 'Chest pain', 'Abdominal pain',
  'Muscle aches', 'Joint pain', 'Rash', 'Swelling', 'Blurred vision'
];

const possibleConditions = {
  'Headache': ['Migraine', 'Tension headache', 'Sinus infection'],
  'Fever': ['Common cold', 'Flu', 'COVID-19', 'Infection'],
  'Cough': ['Common cold', 'Bronchitis', 'Asthma', 'COVID-19'],
  'Fatigue': ['Anemia', 'Sleep disorder', 'Depression', 'Chronic fatigue syndrome'],
  'Shortness of breath': ['Asthma', 'Anxiety', 'Heart failure', 'COVID-19'],
  'Chest pain': ['Angina', 'Heart attack', 'Acid reflux', 'Muscle strain'],
  'Abdominal pain': ['Appendicitis', 'Gallstones', 'Irritable bowel syndrome', 'Food poisoning'],
  'Nausea': ['Food poisoning', 'Migraine', 'Vertigo', 'Morning sickness'],
};

interface SymptomOption {
  name: string;
  selected: boolean;
}

const SymptomChecker: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [symptomOptions, setSymptomOptions] = useState<SymptomOption[]>(
    symptoms.map(symptom => ({ name: symptom, selected: false }))
  );
  const [step, setStep] = useState(1);
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const filteredSymptoms = symptomOptions.filter(symptom => 
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }

    setSymptomOptions(
      symptomOptions.map(option => 
        option.name === symptom 
          ? { ...option, selected: !option.selected } 
          : option
      )
    );
  };

  const analyzeSymptoms = () => {
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const conditions = new Set<string>();
      
      selectedSymptoms.forEach(symptom => {
        const relatedConditions = possibleConditions[symptom as keyof typeof possibleConditions] || [];
        relatedConditions.forEach(condition => conditions.add(condition));
      });
      
      setResults(Array.from(conditions));
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Symptom Checker</h1>
      
      {step === 1 ? (
        <>
          <Card className="mb-6">
            <h2 className="text-lg font-medium mb-4">Select your symptoms</h2>
            <p className="text-gray-600 mb-6">
              Choose all symptoms you're experiencing to get a more accurate assessment.
            </p>
            
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search symptoms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="space-y-2 mb-6 max-h-80 overflow-y-auto pr-2">
              {filteredSymptoms.map((symptom) => (
                <button
                  key={symptom.name}
                  onClick={() => toggleSymptom(symptom.name)}
                  className={`flex items-center justify-between w-full p-3 rounded-md transition-colors ${
                    symptom.selected
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span>{symptom.name}</span>
                  {symptom.selected && <CheckCircle className="h-5 w-5 text-primary-600" />}
                </button>
              ))}
              
              {filteredSymptoms.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No symptoms found. Try a different search term.
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {selectedSymptoms.length} {selectedSymptoms.length === 1 ? 'symptom' : 'symptoms'} selected
              </div>
              <Button
                onClick={analyzeSymptoms}
                disabled={selectedSymptoms.length === 0 || loading}
                isLoading={loading}
                rightIcon={<ArrowRight size={16} />}
              >
                Analyze Symptoms
              </Button>
            </div>
          </Card>
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Important note</h3>
                <div className="text-sm text-blue-700">
                  This tool is for informational purposes only and does not constitute medical advice. 
                  Always consult with a healthcare professional for proper diagnosis and treatment.
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <Card className="mb-6">
            <h2 className="text-lg font-medium mb-4">Possible conditions</h2>
            <p className="text-gray-600 mb-6">
              Based on the symptoms you selected, these conditions might be relevant. 
              This is not a diagnosis, and you should consult with a healthcare provider.
            </p>
            
            <div className="space-y-3 mb-6">
              {results.length > 0 ? (
                results.map((condition, index) => (
                  <div key={index} className="p-4 rounded-lg bg-white border border-gray-200">
                    <h3 className="font-medium text-gray-800">{condition}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      This condition commonly presents with some of the symptoms you selected.
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No specific conditions identified. Please consult a healthcare provider.
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                leftIcon={<ArrowLeft size={16} />}
              >
                Back to Symptoms
              </Button>
              <Button>
                Book an Appointment
              </Button>
            </div>
          </Card>
          
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-amber-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-800">Medical disclaimer</h3>
                <div className="text-sm text-amber-700">
                  These results are based on commonly associated symptoms and are not a medical diagnosis. 
                  Many conditions share similar symptoms. For an accurate diagnosis, please consult 
                  with a qualified healthcare professional.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;