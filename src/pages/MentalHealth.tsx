import React, { useState } from 'react';
import { Brain, Phone, Users, BookOpen, Heart, Smile, MessageCircle, MapPin, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

interface MentalHealthResource {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
  contact?: string;
  available?: string;
}

interface TherapyOption {
  id: number;
  name: string;
  description: string;
  benefits: string[];
  duration: string;
  icon: React.ReactNode;
}

const MentalHealth: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'resources' | 'therapy' | 'tips'>('resources');
  const [showBookingModal, setShowBookingModal] = useState(false);

  const resources: MentalHealthResource[] = [
    {
      id: 1,
      title: '24/7 Crisis Support',
      description: 'Immediate assistance during mental health emergencies',
      icon: <Phone className="w-8 h-8 text-red-500" />,
      details: [
        'Trained counselors available round the clock',
        'Confidential and judgment-free support',
        'Crisis intervention and de-escalation',
        'Local resource referrals'
      ],
      contact: 'Call: 1-800-MENTAL-1',
      available: 'Available 24/7'
    },
    {
      id: 2,
      title: 'Professional Therapy',
      description: 'Connect with licensed mental health professionals',
      icon: <Users className="w-8 h-8 text-blue-500" />,
      details: [
        'Licensed therapists and counselors',
        'Individual and group sessions',
        'Multiple therapy modalities available',
        'Flexible scheduling options'
      ],
      contact: 'Book appointment online',
      available: 'Mon-Sun: 8AM-8PM'
    },
    {
      id: 3,
      title: 'Support Groups',
      description: 'Connect with others facing similar challenges',
      icon: <Heart className="w-8 h-8 text-pink-500" />,
      details: [
        'Peer support for various conditions',
        'Weekly meetings and online sessions',
        'Shared experiences and coping strategies',
        'Safe and confidential environment'
      ],
      contact: 'Join online community',
      available: 'Multiple times daily'
    },
    {
      id: 4,
      title: 'Self-Help Tools',
      description: 'Guided exercises and resources for daily wellness',
      icon: <BookOpen className="w-8 h-8 text-green-500" />,
      details: [
        'Meditation and mindfulness programs',
        'Breathing exercises and relaxation',
        'Mood tracking and journaling',
        'Educational resources and guides'
      ],
      contact: 'Access anytime from app',
      available: 'Always available'
    },
    {
      id: 5,
      title: 'Family Counseling',
      description: 'Strengthen relationships and family dynamics',
      icon: <Smile className="w-8 h-8 text-purple-500" />,
      details: [
        'Couple\'s therapy sessions',
        'Family conflict resolution',
        'Communication skill building',
        'Parenting and relationship support'
      ],
      contact: 'Schedule consultation',
      available: 'Mon-Sat: 10AM-6PM'
    },
    {
      id: 6,
      title: 'Peer Chat',
      description: 'Connect with trained peer counselors',
      icon: <MessageCircle className="w-8 h-8 text-cyan-500" />,
      details: [
        'Text-based peer support',
        'Trained peer counselors',
        'Quick response times',
        'Anonymous option available'
      ],
      contact: 'Start chat session',
      available: '24/7'
    }
  ];

  const therapyOptions: TherapyOption[] = [
    {
      id: 1,
      name: 'Cognitive Behavioral Therapy (CBT)',
      description: 'Focus on identifying and changing negative thought patterns',
      benefits: [
        'Treats depression and anxiety effectively',
        'Practical and goal-oriented approach',
        'Skills you can use in daily life',
        'Scientifically proven results'
      ],
      duration: '12-20 sessions typical',
      icon: <Brain className="w-6 h-6 text-blue-500" />
    },
    {
      id: 2,
      name: 'Dialectical Behavior Therapy (DBT)',
      description: 'Combines CBT with acceptance and mindfulness strategies',
      benefits: [
        'Excellent for emotional regulation',
        'Builds distress tolerance',
        'Improves interpersonal effectiveness',
        'Reduces self-destructive behaviors'
      ],
      duration: '12 months typical',
      icon: <Heart className="w-6 h-6 text-pink-500" />
    },
    {
      id: 3,
      name: 'Psychodynamic Therapy',
      description: 'Explores unconscious patterns and past experiences',
      benefits: [
        'Deeper self-understanding',
        'Addresses root causes',
        'Long-term psychological growth',
        'Improves relationships'
      ],
      duration: '6-12 months typical',
      icon: <Brain className="w-6 h-6 text-purple-500" />
    },
    {
      id: 4,
      name: 'Mindfulness-Based Therapy',
      description: 'Uses meditation and awareness techniques',
      benefits: [
        'Reduces stress and anxiety',
        'Improves emotional awareness',
        'Enhances focus and clarity',
        'Promotes overall wellbeing'
      ],
      duration: '8 weeks typical',
      icon: <Smile className="w-6 h-6 text-green-500" />
    }
  ];

  const mentalWellnessTips = [
    {
      title: 'Practice Regular Meditation',
      description: 'Start with just 5 minutes daily to reduce stress and anxiety',
      icon: '🧘'
    },
    {
      title: 'Maintain Social Connections',
      description: 'Spend quality time with friends and family for emotional support',
      icon: '👥'
    },
    {
      title: 'Exercise Regularly',
      description: 'Physical activity releases endorphins and improves mood',
      icon: '🏃'
    },
    {
      title: 'Establish Healthy Routines',
      description: 'Consistent sleep, meals, and exercise support mental health',
      icon: '⏰'
    },
    {
      title: 'Practice Gratitude',
      description: 'Daily gratitude practice can shift perspective and improve mood',
      icon: '🙏'
    },
    {
      title: 'Limit Screen Time',
      description: 'Reduce exposure to social media and news to protect mental health',
      icon: '📱'
    },
    {
      title: 'Pursue Hobbies',
      description: 'Engaging in activities you love promotes joy and satisfaction',
      icon: '🎨'
    },
    {
      title: 'Seek Professional Help',
      description: 'Don\'t hesitate to reach out to mental health professionals',
      icon: '💬'
    }
  ];

  const handleBooking = () => {
    toast.success('Appointment booking request submitted! We\'ll contact you soon.');
    setShowBookingModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 rounded-full p-3">
            <Brain className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Mental Health & Wellness</h1>
        </div>
        <p className="text-xl text-gray-600">Your mental health matters. Access professional support and self-help resources.</p>
      </div>

      <div className="flex gap-4 mb-8 border-b border-gray-200">
        <button
          onClick={() => setSelectedTab('resources')}
          className={`pb-4 px-4 font-medium text-lg transition-colors ${
            selectedTab === 'resources'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Resources
        </button>
        <button
          onClick={() => setSelectedTab('therapy')}
          className={`pb-4 px-4 font-medium text-lg transition-colors ${
            selectedTab === 'therapy'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Therapy Options
        </button>
        <button
          onClick={() => setSelectedTab('tips')}
          className={`pb-4 px-4 font-medium text-lg transition-colors ${
            selectedTab === 'tips'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Wellness Tips
        </button>
      </div>

      {selectedTab === 'resources' && (
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {resources.map((resource) => (
            <Card key={resource.id} hover={true} className="flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">{resource.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{resource.title}</h3>
                  <p className="text-gray-600 text-sm">{resource.description}</p>
                </div>
              </div>

              <ul className="space-y-2 mb-4 flex-grow">
                {resource.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-blue-500 font-bold mt-0.5">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-gray-200 space-y-2">
                {resource.contact && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Contact:</span> {resource.contact}
                  </p>
                )}
                {resource.available && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Available:</span> {resource.available}
                  </p>
                )}
              </div>

              <Button
                variant="ghost"
                className="text-blue-600 mt-4 w-full justify-center"
                rightIcon={<ArrowRight size={16} />}
                onClick={() => setShowBookingModal(true)}
              >
                Learn More
              </Button>
            </Card>
          ))}
        </div>
      )}

      {selectedTab === 'therapy' && (
        <div className="space-y-6 mb-8">
          {therapyOptions.map((therapy) => (
            <Card key={therapy.id} hover={true}>
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">{therapy.icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800">{therapy.name}</h3>
                  <p className="text-gray-600 mt-1">{therapy.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Key Benefits</h4>
                  <ul className="space-y-2">
                    {therapy.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-green-500 font-bold mt-0.5">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-semibold">Typical Duration:</span><br />{therapy.duration}
                  </p>
                  <Button
                    onClick={() => setShowBookingModal(true)}
                    className="w-full"
                  >
                    Schedule Consultation
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedTab === 'tips' && (
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {mentalWellnessTips.map((tip, idx) => (
            <Card key={idx} hover={true}>
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{tip.icon}</div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{tip.title}</h4>
                  <p className="text-gray-600">{tip.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 mb-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <MessageCircle className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Need Immediate Help?</h3>
            <p className="text-gray-700 mb-4">
              If you're experiencing a mental health crisis or having thoughts of self-harm, please reach out immediately to a mental health professional or crisis service.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => toast.success('Calling emergency support...')}>
                Call Crisis Line
              </Button>
              <Button variant="outline" onClick={() => toast.success('Sending message...')}>
                Text Support
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Book an Appointment</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Service
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Individual Therapy</option>
                  <option>Couples Therapy</option>
                  <option>Family Counseling</option>
                  <option>Support Group</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button onClick={handleBooking} className="flex-1">
                  Submit
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MentalHealth;
