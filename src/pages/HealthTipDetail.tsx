import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

interface TipDetail {
  id: number;
  title: string;
  shortDescription: string;
  image: string;
  category: string;
  benefits: string[];
  steps: string[];
  tips: string[];
  warnings?: string[];
  relatedTips?: string[];
}

const tipDetails: Record<number, TipDetail> = {
  1: {
    id: 1,
    title: 'Stay Hydrated for Better Health',
    shortDescription: 'Drinking adequate water helps maintain body functions, improves energy levels, and promotes better skin health.',
    image: 'https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    category: 'Nutrition',
    benefits: [
      'Maintains body temperature regulation',
      'Improves cognitive function and concentration',
      'Enhances physical performance during exercise',
      'Supports kidney and digestive function',
      'Promotes clear and healthy skin',
      'Aids in nutrient transportation throughout the body',
      'Helps control calorie intake and supports weight management',
      'Reduces fatigue and increases energy levels'
    ],
    steps: [
      'Start your day with a glass of water on an empty stomach',
      'Drink water with every meal',
      'Keep a water bottle with you throughout the day',
      'Set reminders to drink water if you tend to forget',
      'Increase water intake during exercise and hot weather',
      'Drink water before, during, and after physical activities',
      'Monitor your urine color - pale yellow indicates good hydration',
      'Adjust intake based on climate, activity level, and individual needs'
    ],
    tips: [
      'Add lemon or cucumber slices for flavor if plain water seems boring',
      'Drink room temperature water for better absorption',
      'Space out water consumption throughout the day rather than drinking large amounts at once',
      'Include water-rich foods like fruits and vegetables in your diet',
      'Drink herbal teas for variety while maintaining hydration',
      'Create a daily hydration goal (typically 8-10 glasses)',
      'Listen to your body - thirst is an indicator you need water',
      'Children and elderly should pay extra attention to hydration'
    ],
    warnings: [
      'Avoid excessive water consumption (hyponatremia) which can be dangerous',
      'People with certain kidney conditions should consult their doctor',
      'Athletes should avoid drinking only water during intense exercise - electrolytes are needed',
      'Medications may affect hydration needs - consult your healthcare provider'
    ],
    relatedTips: ['Healthy Sleep Habits', 'Mental Health Benefits']
  },
  2: {
    id: 2,
    title: '10-Minute Morning Stretches',
    shortDescription: 'Start your day with simple stretches to improve flexibility, reduce muscle tension, and boost energy levels.',
    image: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    category: 'Exercise',
    benefits: [
      'Increases blood flow and oxygen delivery to muscles',
      'Improves flexibility and range of motion',
      'Reduces morning stiffness and muscle soreness',
      'Boosts energy and mental alertness',
      'Improves posture throughout the day',
      'Reduces stress and promotes relaxation',
      'Prevents injuries during exercise',
      'Enhances athletic performance'
    ],
    steps: [
      'Find a quiet space with enough room to move around',
      'Start with gentle neck rolls - 5 circles each direction',
      'Perform shoulder rolls and reach arms overhead',
      'Do forward bends to touch your toes',
      'Perform lunges - 10 per side',
      'Do a cat-cow stretch for your spine',
      'Try a child\'s pose for deep back stretch',
      'End with a standing quad stretch - 30 seconds per leg'
    ],
    tips: [
      'Warm up slightly before stretching - light movement helps',
      'Never bounce during stretches - hold steady',
      'Breathe deeply throughout - this enhances the stretch',
      'Don\'t push past the point of mild discomfort',
      'Hold each stretch for 20-30 seconds',
      'Consistency matters more than intensity',
      'Morning stretches prepare your body for the day',
      'Combine with deep breathing for maximum benefit'
    ],
    warnings: [
      'Don\'t stretch immediately after waking up without warming up',
      'If you have joint problems, consult a physiotherapist first',
      'Never force a stretch - listen to your body',
      'Avoid intense stretching if you have muscle injuries'
    ],
    relatedTips: ['Stay Hydrated', 'Mindful Breathing Techniques']
  },
  3: {
    id: 3,
    title: 'Mindful Breathing Techniques',
    shortDescription: 'Practice deep breathing exercises to reduce stress, improve focus, and promote relaxation throughout your day.',
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    category: 'Mental Health',
    benefits: [
      'Reduces stress and anxiety levels',
      'Lowers blood pressure and heart rate',
      'Improves focus and mental clarity',
      'Enhances emotional regulation',
      'Activates the parasympathetic nervous system',
      'Improves sleep quality',
      'Boosts immune function',
      'Increases oxygen flow to the brain'
    ],
    steps: [
      'Find a comfortable seated position',
      'Place one hand on your chest and one on your belly',
      'Inhale slowly through your nose for a count of 4',
      'Hold the breath for a count of 4',
      'Exhale slowly through your mouth for a count of 4',
      'Hold empty for a count of 4',
      'Repeat this cycle 5-10 times',
      'Notice how you feel - usually more calm and centered'
    ],
    tips: [
      'Practice breathing exercises at the same time daily for best results',
      'Use the 4-7-8 technique: inhale for 4, hold for 7, exhale for 8',
      'Box breathing is great for quick stress relief: 4-4-4-4 pattern',
      'Practice in a quiet, comfortable space initially',
      'Can be done anywhere when you need quick calm',
      'Combine with meditation for deeper relaxation',
      'Practice daily for long-term anxiety management',
      'Use during stressful situations for immediate relief'
    ],
    warnings: [
      'People with respiratory conditions should consult doctors',
      'Don\'t practice immediately after eating',
      'If you feel dizzy, stop and return to normal breathing',
      'Avoid breath-holding if you have heart conditions'
    ],
    relatedTips: ['Healthy Sleep Habits', 'Stress Management']
  },
  4: {
    id: 4,
    title: 'Healthy Sleep Habits',
    shortDescription: 'Establish a consistent sleep schedule and create a relaxing bedtime routine for better sleep quality.',
    image: 'https://images.pexels.com/photos/1028741/pexels-photo-1028741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    category: 'Sleep',
    benefits: [
      'Improves cognitive function and memory consolidation',
      'Boosts immune system function',
      'Enhances mood and mental health',
      'Supports weight management and metabolism',
      'Reduces risk of chronic diseases',
      'Improves athletic performance and recovery',
      'Enhances creativity and problem-solving',
      'Increases productivity and focus during the day'
    ],
    steps: [
      'Set a consistent bedtime and wake time - even on weekends',
      'Create a pre-sleep routine 30 minutes before bed',
      'Dim the lights in your home',
      'Put away electronic devices',
      'Take a warm bath or shower',
      'Practice relaxation techniques like meditation',
      'Make your bedroom cool, dark, and quiet',
      'Get into bed only when you\'re ready to sleep'
    ],
    tips: [
      'Aim for 7-9 hours of sleep per night for adults',
      'Avoid caffeine after 2 PM',
      'Exercise during the day but not close to bedtime',
      'Keep your bedroom temperature around 65-68°F (18-20°C)',
      'Use blackout curtains to create darkness',
      'Consider white noise for a quiet environment',
      'Keep a consistent sleep schedule even on weekends',
      'Avoid large meals close to bedtime'
    ],
    warnings: [
      'Persistent sleep issues may indicate sleep disorders - consult a doctor',
      'Avoid sleeping pills without medical supervision',
      'Don\'t rely on alcohol for sleep - it disrupts sleep quality',
      'Chronic sleep deprivation can lead to serious health issues'
    ],
    relatedTips: ['Mindful Breathing Techniques', 'Stress Management']
  }
};

const HealthTipDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tipId = parseInt(id || '1');
  const tip = tipDetails[tipId];

  if (!tip) {
    return (
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          leftIcon={<ArrowLeft size={16} />}
          onClick={() => navigate('/health-tips')}
          className="mb-6"
        >
          Back to Health Tips
        </Button>
        <Card className="text-center py-8">
          <p className="text-gray-600">Tip not found. Please go back and try again.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        variant="ghost"
        leftIcon={<ArrowLeft size={16} />}
        onClick={() => navigate('/health-tips')}
        className="mb-6"
      >
        Back to Health Tips
      </Button>

      <div className="mb-8">
        <div className="relative h-96 mb-6 rounded-lg overflow-hidden">
          <img
            src={tip.image}
            alt={tip.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-50 text-primary-700 rounded-full">
            {tip.category}
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">{tip.title}</h1>
        <p className="text-xl text-gray-600 mb-8">{tip.shortDescription}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <CheckCircle2 className="text-green-500" size={28} />
            Key Benefits
          </h2>
          <ul className="space-y-3">
            {tip.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-primary-500 font-bold mt-1">•</span>
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Lightbulb className="text-yellow-500" size={28} />
            Helpful Tips
          </h2>
          <ul className="space-y-3">
            {tip.tips.map((tipItem, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold mt-1">•</span>
                <span className="text-gray-700">{tipItem}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Step-by-Step Guide</h2>
        <div className="space-y-4">
          {tip.steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-semibold">
                {index + 1}
              </div>
              <div className="pt-1">
                <p className="text-gray-700">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {tip.warnings && tip.warnings.length > 0 && (
        <Card className="mb-8 border-2 border-orange-200 bg-orange-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <AlertCircle className="text-orange-500" size={28} />
            Important Warnings
          </h2>
          <ul className="space-y-3">
            {tip.warnings.map((warning, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-orange-500 font-bold mt-1">⚠</span>
                <span className="text-gray-700">{warning}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <div className="text-center">
        <Button onClick={() => navigate('/health-tips')}>
          Back to All Tips
        </Button>
      </div>
    </div>
  );
};

export default HealthTipDetail;
