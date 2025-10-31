import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, AlertCircle, Calendar, MapPin, Lightbulb, Brain, Pill, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Stethoscope size={28} className="text-primary-600" />,
      title: t('symptoms'),
      description: 'Check your symptoms and find possible conditions',
      link: '/symptom-checker',
      color: 'bg-primary-50'
    },
    {
      icon: <AlertCircle size={28} className="text-red-600" />,
      title: t('emergency'),
      description: 'Quick access to emergency services',
      link: '/emergency',
      color: 'bg-red-50'
    },
    {
      icon: <Calendar size={28} className="text-secondary-600" />,
      title: t('appointments'),
      description: 'Book appointments with healthcare providers',
      link: '/appointments',
      color: 'bg-secondary-50'
    },
    {
      icon: <Pill size={28} className="text-indigo-600" />,
      title: t('medications'),
      description: 'Set medication reminders and track your intake',
      link: '/medication-reminders',
      color: 'bg-indigo-50'
    },
    {
      icon: <MapPin size={28} className="text-emerald-600" />,
      title: t('nearby'),
      description: 'Find healthcare facilities near you',
      link: '/nearby-care',
      color: 'bg-emerald-50'
    },
    {
      icon: <Lightbulb size={28} className="text-amber-600" />,
      title: t('tips'),
      description: 'Daily health tips and seasonal advice',
      link: '/health-tips',
      color: 'bg-amber-50'
    },
    {
      icon: <Brain size={28} className="text-purple-600" />,
      title: t('mental'),
      description: 'Resources for mental health and wellbeing',
      link: '/mental-health',
      color: 'bg-purple-50'
    },
    {
      icon: <Pill size={28} className="text-blue-600" />,
      title: t('labs'),
      description: 'Book lab tests and view results securely',
      link: '/lab-tests',
      color: 'bg-blue-50'
    }
  ];

  const quickAccess = [
    {
      title: t('checkSymptoms'),
      link: '/symptom-checker',
      color: 'bg-primary-600',
      icon: <Stethoscope size={24} />
    },
    {
      title: t('emergencyHelp'),
      link: '/emergency',
      color: 'bg-red-600',
      icon: <AlertCircle size={24} />
    },
    {
      title: t('bookAppointment'),
      link: '/appointments',
      color: 'bg-secondary-600',
      icon: <Calendar size={24} />
    },
    {
      title: t('findCare'),
      link: '/nearby-care',
      color: 'bg-emerald-600',
      icon: <MapPin size={24} />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <section className="mb-10 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-12 md:py-16 md:px-10 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('welcome')}</h1>
          <p className="text-primary-100 text-lg md:text-xl mb-8">{t('tagline')}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickAccess.map((item, index) => (
              <Link key={index} to={item.link}>
                <div className={`${item.color} rounded-lg p-4 text-white transition-transform hover:scale-105`}>
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-2">{item.icon}</div>
                    <span className="font-medium">{item.title}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <Card key={index} hover={true} className="flex flex-col h-full">
              <div className={`${feature.color} p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{feature.description}</p>
              <Link to={feature.link}>
                <Button variant="ghost" rightIcon={<ArrowRight size={16} />} className="text-primary-600">
                  Learn more
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="bg-secondary-50 rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Health Tips of the Day</h2>
              <p className="text-gray-600 mb-4">
                Stay hydrated by drinking at least 8 glasses of water daily. Proper hydration supports your immune system, improves energy levels, and helps maintain healthy skin.
              </p>
              <Link to="/health-tips">
                <Button variant="secondary" rightIcon={<ArrowRight size={16} />}>
                  More health tips
                </Button>
              </Link>
            </div>
            <div className="md:w-1/3 bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-800 mb-2">Upcoming Appointment</h3>
              <p className="text-sm text-gray-600">Dr. Sarah Johnson</p>
              <p className="text-sm text-gray-600">Tomorrow at 10:30 AM</p>
              <div className="mt-3">
                <Button variant="outline" size="sm" fullWidth>
                  View details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;