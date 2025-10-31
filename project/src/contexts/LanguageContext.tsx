import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'es' | 'fr' | 'zh' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    symptoms: 'Symptom Checker',
    emergency: 'Emergency',
    appointments: 'Appointments',
    remedies: 'Home Remedies',
    medications: 'Medications',
    nearby: 'Nearby Care',
    tips: 'Health Tips',
    mental: 'Mental Health',
    labs: 'Lab Tests',
    welcome: 'Welcome to MediCare',
    tagline: 'Your health companion',
    checkSymptoms: 'Check Symptoms',
    emergencyHelp: 'Emergency Help',
    bookAppointment: 'Book Appointment',
    findCare: 'Find Care Nearby',
  },
  es: {
    home: 'Inicio',
    symptoms: 'Verificador de Síntomas',
    emergency: 'Emergencia',
    appointments: 'Citas',
    remedies: 'Remedios Caseros',
    medications: 'Medicamentos',
    nearby: 'Atención Cercana',
    tips: 'Consejos de Salud',
    mental: 'Salud Mental',
    labs: 'Pruebas de Laboratorio',
    welcome: 'Bienvenido a MediCare',
    tagline: 'Tu compañero de salud',
    checkSymptoms: 'Verificar Síntomas',
    emergencyHelp: 'Ayuda de Emergencia',
    bookAppointment: 'Reservar Cita',
    findCare: 'Encontrar Atención Cercana',
  },
  fr: {
    home: 'Accueil',
    symptoms: 'Vérificateur de Symptômes',
    emergency: 'Urgence',
    appointments: 'Rendez-vous',
    remedies: 'Remèdes Maison',
    medications: 'Médicaments',
    nearby: 'Soins à Proximité',
    tips: 'Conseils de Santé',
    mental: 'Santé Mentale',
    labs: 'Tests de Laboratoire',
    welcome: 'Bienvenue à MediCare',
    tagline: 'Votre compagnon de santé',
    checkSymptoms: 'Vérifier les Symptômes',
    emergencyHelp: 'Aide d\'Urgence',
    bookAppointment: 'Prendre Rendez-vous',
    findCare: 'Trouver des Soins à Proximité',
  },
  zh: {
    home: '首页',
    symptoms: '症状检查',
    emergency: '紧急情况',
    appointments: '预约',
    remedies: '家庭疗法',
    medications: '药物',
    nearby: '附近医疗',
    tips: '健康提示',
    mental: '心理健康',
    labs: '实验室测试',
    welcome: '欢迎来到 MediCare',
    tagline: '您的健康伴侣',
    checkSymptoms: '检查症状',
    emergencyHelp: '紧急帮助',
    bookAppointment: '预约',
    findCare: '寻找附近医疗',
  },
  ar: {
    home: 'الرئيسية',
    symptoms: 'فاحص الأعراض',
    emergency: 'طوارئ',
    appointments: 'المواعيد',
    remedies: 'علاجات منزلية',
    medications: 'الأدوية',
    nearby: 'رعاية قريبة',
    tips: 'نصائح صحية',
    mental: 'الصحة النفسية',
    labs: 'فحوصات مخبرية',
    welcome: 'مرحبًا بك في MediCare',
    tagline: 'رفيق صحتك',
    checkSymptoms: 'تحقق من الأعراض',
    emergencyHelp: 'مساعدة طارئة',
    bookAppointment: 'حجز موعد',
    findCare: 'البحث عن رعاية قريبة',
  },
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};