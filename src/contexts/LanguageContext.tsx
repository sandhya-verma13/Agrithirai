
import { createContext, useContext, useState, ReactNode } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    // Home page
    'welcome': 'Welcome to the Screen of Future',
    'ai-quote': 'AI doesn\'t replace the farmer- it amplifies their potential',
    'try-ai-assistant': 'Try AI Assistant',
    'explore-schemes': 'Explore Schemes',
    
    // Features section
    'ai-powered-features': 'AI-Powered Features for Modern Farming',
    'agrithirai-leverages': 'AgriThirai leverages artificial intelligence to provide farmers with powerful tools and insights.',
    'weather-forecasts': 'Weather Forecasts',
    'weather-description': 'Access real-time weather data and forecasts tailored for agricultural needs.',
    'government-schemes': 'Government Schemes',
    'schemes-description': 'Discover government initiatives, subsidies, and programs designed for farmers.',
    'equipment': 'Agricultural Equipment',
    'equipment-description': 'Explore modern farming equipment and technologies with AI-powered recommendations.',
    'crop-management': 'Crop Management',
    'crop-description': 'Get detailed information on crops, cultivation practices, and market prices.',
    'ai-assistant': 'AI Assistant',
    'assistant-description': 'Ask questions and receive intelligent guidance tailored to your farming needs.',
    'market-prices': 'Live Market Prices',
    'prices-description': 'Monitor real-time agricultural commodity prices to maximize profits.',
    'learn-more': 'Learn more',
    
    // Transformation section
    'transforming-agriculture': 'We\'re Transforming Agriculture with AI Technology',
    'dedicated-text': 'AgriThirai is dedicated to revolutionizing farming practices through artificial intelligence. Our platform provides farmers with data-driven insights, personalized recommendations, and real-time information to optimize crop production and increase profitability.',
    'ai-crop': 'AI-powered crop recommendations',
    'market-analysis': 'Real-time market price analysis',
    'weather-forecast': 'Weather forecasting and alerts',
    'personalized-scheme': 'Personalized government scheme matching',
    'talk-to-ai': 'Talk to Our AI Assistant',
    
    // Join section
    'join-thousands': 'Join Thousands of Farmers Using AgriThirai',
    'ready-transform': 'Ready to transform your farming experience with cutting-edge AI technology? Sign up today and start making data-driven decisions for better yields and increased profits.',
    'create-account': 'Create Free Account',
    'try-demo': 'Try Demo',
  },
  ta: {
    // Home page
    'welcome': 'எதிர்காலத்தின் திரைக்கு வரவேற்கிறோம்',
    'ai-quote': 'செயற்கை நுண்ணறிவு விவசாயியை மாற்றவில்லை - அது அவர்களின் திறனை பெருக்குகிறது',
    'try-ai-assistant': 'செயற்கை நுண்ணறிவு உதவியாளரை முயற்சிக்கவும்',
    'explore-schemes': 'திட்டங்களை ஆராய',
    
    // Features section
    'ai-powered-features': 'நவீன விவசாயத்திற்கான செயற்கை நுண்ணறிவு அம்சங்கள்',
    'agrithirai-leverages': 'அக்ரித்திரை விவசாயிகளுக்கு சக்திவாய்ந்த கருவிகள் மற்றும் நுண்ணறிவுகளை வழங்க செயற்கை நுண்ணறிவைப் பயன்படுத்துகிறது.',
    'weather-forecasts': 'வானிலை முன்னறிவிப்புகள்',
    'weather-description': 'விவசாய தேவைகளுக்கு ஏற்ப தயாரிக்கப்பட்ட நிகழ்நேர வானிலை தரவு மற்றும் முன்னறிவிப்புகளை அணுகவும்.',
    'government-schemes': 'அரசு திட்டங்கள்',
    'schemes-description': 'விவசாயிகளுக்காக வடிவமைக்கப்பட்ட அரசு முயற்சிகள், மானியங்கள் மற்றும் திட்டங்களைக் கண்டறியவும்.',
    'equipment': 'விவசாய உபகரணங்கள்',
    'equipment-description': 'செயற்கை நுண்ணறிவு பரிந்துரைகளுடன் நவீன விவசாய உபகரணங்கள் மற்றும் தொழில்நுட்பங்களை ஆராயுங்கள்.',
    'crop-management': 'பயிர் மேலாண்மை',
    'crop-description': 'பயிர்கள், சாகுபடி நடைமுறைகள் மற்றும் சந்தை விலைகள் குறித்த விரிவான தகவல்களைப் பெறுங்கள்.',
    'ai-assistant': 'செயற்கை நுண்ணறிவு உதவியாளர்',
    'assistant-description': 'கேள்விகளைக் கேட்கவும், உங்கள் விவசாய தேவைகளுக்கு ஏற்ப புத்திசாலித்தனமான வழிகாட்டுதலைப் பெறவும்.',
    'market-prices': 'நேரடி சந்தை விலைகள்',
    'prices-description': 'லாபத்தை அதிகரிக்க நிகழ்நேர விவசாய பொருட்களின் விலைகளைக் கண்காணிக்கவும்.',
    'learn-more': 'மேலும் அறிய',
    
    // Transformation section
    'transforming-agriculture': 'நாங்கள் செயற்கை நுண்ணறிவு தொழில்நுட்பத்துடன் விவசாயத்தை மாற்றியமைக்கிறோம்',
    'dedicated-text': 'அக்ரித்திரை செயற்கை நுண்ணறிவு மூலம் விவசாய நடைமுறைகளை புரட்சிகரமாக்குவதற்கு அர்ப்பணிக்கப்பட்டுள்ளது. எங்கள் தளம் விவசாயிகளுக்கு தரவு சார்ந்த நுண்ணறிவுகள், தனிப்பயனாக்கப்பட்ட பரிந்துரைகள் மற்றும் பயிர் உற்பத்தியை அதிகரிக்க மற்றும் லாபகரத்தன்மையை அதிகரிக்க நிகழ்நேர தகவல்களை வழங்குகிறது.',
    'ai-crop': 'செயற்கை நுண்ணறிவு சக்தி வாய்ந்த பயிர் பரிந்துரைகள்',
    'market-analysis': 'நிகழ்நேர சந்தை விலை பகுப்பாய்வு',
    'weather-forecast': 'வானிலை முன்னறிவிப்பு மற்றும் எச்சரிக்கைகள்',
    'personalized-scheme': 'தனிப்பயனாக்கப்பட்ட அரசு திட்ட பொருத்தம்',
    'talk-to-ai': 'எங்கள் செயற்கை நுண்ணறிவு உதவியாளரிடம் பேசுங்கள்',
    
    // Join section
    'join-thousands': 'ஆயிரக்கணக்கான விவசாயிகள் அக்ரித்திரையைப் பயன்படுத்தி இணையுங்கள்',
    'ready-transform': 'அதிநவீன செயற்கை நுண்ணறிவு தொழில்நுட்பத்துடன் உங்கள் விவசாய அனுபவத்தை மாற்ற தயாரா? இன்றே பதிவு செய்து சிறந்த மகசூல் மற்றும் அதிகரித்த லாபங்களுக்காக தரவு சார்ந்த முடிவுகளை எடுக்கத் தொடங்குங்கள்.',
    'create-account': 'இலவச கணக்கை உருவாக்குங்கள்',
    'try-demo': 'டெமோவை முயற்சிக்கவும்',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    const currentTranslations = translations[language as keyof typeof translations];
    return currentTranslations[key as keyof typeof currentTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
