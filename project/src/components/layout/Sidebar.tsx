import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, Stethoscope, AlertCircle, Calendar, Home as HomeIcon, Pill, MapPin, Lightbulb, Brain, FlaskRound as Flask } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const { t } = useLanguage();
  
  const navLinks = [
    { path: '/', icon: <HomeIcon size={20} />, label: t('home') },
    { path: '/symptom-checker', icon: <Stethoscope size={20} />, label: t('symptoms') },
    { path: '/emergency', icon: <AlertCircle size={20} />, label: t('emergency') },
    { path: '/appointments', icon: <Calendar size={20} />, label: t('appointments') },
    { path: '/home-remedies', icon: <HomeIcon size={20} />, label: t('remedies') },
    { path: '/medication-reminders', icon: <Pill size={20} />, label: t('medications') },
    { path: '/nearby-care', icon: <MapPin size={20} />, label: t('nearby') },
    { path: '/health-tips', icon: <Lightbulb size={20} />, label: t('tips') },
    { path: '/mental-health', icon: <Brain size={20} />, label: t('mental') },
    { path: '/lab-tests', icon: <Flask size={20} />, label: t('labs') },
  ];

  return (
    <div 
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 z-30 transition duration-300 ease-in-out md:static md:inset-auto md:translate-x-0 
      bg-white shadow-lg md:shadow-none w-64 md:w-56 lg:w-64 flex-shrink-0 overflow-y-auto`}
    >
      <div className="h-16 flex items-center justify-between px-4 md:hidden">
        <div className="flex items-center">
          <span className="text-xl font-bold text-gray-900">MediCare</span>
        </div>
        <button 
          onClick={closeSidebar}
          className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md"
        >
          <X size={24} />
        </button>
      </div>
      <nav className="mt-5 px-4 space-y-1">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <span className="mr-3">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;