import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, Calendar, ArrowRight, Bell, Filter, Search } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

interface Tip {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  image: string;
}

const categories = [
  'Nutrition', 'Exercise', 'Mental Health', 'Sleep',
  'Seasonal', 'Family Health', 'Preventive Care', 'Lifestyle'
];

const healthTips: Tip[] = [
  {
    id: 1,
    title: 'Stay Hydrated for Better Health',
    description: 'Drinking adequate water helps maintain body functions, improves energy levels, and promotes better skin health. Aim for 8 glasses daily.',
    category: 'Nutrition',
    date: 'Today',
    image: 'https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    id: 2,
    title: '10-Minute Morning Stretches',
    description: 'Start your day with simple stretches to improve flexibility, reduce muscle tension, and boost energy levels.',
    category: 'Exercise',
    date: 'Yesterday',
    image: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    id: 3,
    title: 'Mindful Breathing Techniques',
    description: 'Practice deep breathing exercises to reduce stress, improve focus, and promote relaxation throughout your day.',
    category: 'Mental Health',
    date: '2 days ago',
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    id: 4,
    title: 'Healthy Sleep Habits',
    description: 'Establish a consistent sleep schedule and create a relaxing bedtime routine for better sleep quality.',
    category: 'Sleep',
    date: '3 days ago',
    image: 'https://images.pexels.com/photos/1028741/pexels-photo-1028741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  }
];

const HealthTips: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  const filteredTips = healthTips.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || tip.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Health Tips & Advice</h1>
          <p className="text-gray-600 mt-1">Stay informed with daily health tips and seasonal advice</p>
        </div>
        <Button
          onClick={() => setShowSubscribeModal(true)}
          leftIcon={<Bell size={16} />}
        >
          Subscribe to Tips
        </Button>
      </div>

      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search health tips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <select
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {filteredTips.map((tip) => (
          <Card key={tip.id} hover={true} className="overflow-hidden">
            <div className="relative h-48 mb-4">
              <img
                src={tip.image}
                alt={tip.title}
                className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded">
                  {tip.category}
                </span>
                <span className="text-sm text-gray-500 flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {tip.date}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{tip.title}</h3>
              <p className="text-gray-600 mb-4">{tip.description}</p>
              <Button
                variant="ghost"
                className="text-primary-600"
                rightIcon={<ArrowRight size={16} />}
                onClick={() => navigate(`/health-tips/${tip.id}`)}
              >
                Read more
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-4">
            <div className="bg-primary-100 rounded-full p-3">
              <Lightbulb className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800">Daily Health Tip</h3>
            <p className="text-gray-600">
              Regular exercise not only improves physical health but also boosts mood and cognitive function. 
              Try to get at least 30 minutes of moderate activity each day.
            </p>
          </div>
        </div>
      </Card>

      {showSubscribeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Subscribe to Health Tips</h2>
            <p className="text-gray-600 mb-4">
              Get daily health tips and seasonal advice delivered directly to your inbox.
            </p>
            <div className="mb-4">
              <input
                type="email"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowSubscribeModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setShowSubscribeModal(false)}>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthTips;