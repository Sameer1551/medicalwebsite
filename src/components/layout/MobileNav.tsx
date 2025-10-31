import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Stethoscope, AlertCircle, Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const MobileNav: React.FC = () => {
  const { t } = useLanguage();
  
  const navItems = [
    { path: '/', icon: <Home size={20} />, label: t('home') },
    { path: '/symptom-checker', icon: <Stethoscope size={20} />, label: t('symptoms') },
    { path: '/emergency', icon: <AlertCircle size={20} />, label: t('emergency') },
    { path: '/appointments', icon: <Calendar size={20} />, label: t('appointments') },
    { path: '/nearby-care', icon: <MapPin size={20} />, label: t('nearby') },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 py-2">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center px-3 py-1 rounded-md ${
                isActive ? 'text-primary-600' : 'text-gray-500'
              }`
            }
          >
            <span>{item.icon}</span>
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;