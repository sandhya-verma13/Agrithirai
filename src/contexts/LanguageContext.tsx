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
  },
  hi: {
    // Home page
    'welcome': 'भविष्य के स्क्रीन में आपका स्वागत है',
    'ai-quote': 'AI किसान को प्रतिस्थापित नहीं करता है - यह उनकी क्षमता को बढ़ाता है',
    'try-ai-assistant': 'AI सहायक आज़माएं',
    'explore-schemes': 'योजनाओं का अन्वेषण करें',
    // Features section
    'ai-powered-features': 'आधुनिक खेती के लिए AI-संचालित सुविधाएँ',
    'agrithirai-leverages': 'AgriThirai किसानों को शक्तिशाली उपकरण और अंतर्दृष्टि प्रदान करने के लिए कृत्रिम बुद्धिमत्ता का उपयोग करता है।',
    'weather-forecasts': 'मौसम का पूर्वानुमान',
    'weather-description': 'कृषि आवश्यकताओं के लिए अनुकूलित वास्तविक समय के मौसम डेटा और पूर्वानुमानों तक पहुंचें।',
    'government-schemes': 'सरकारी योजनाएँ',
    'schemes-description': 'किसानों के लिए डिज़ाइन की गई सरकारी पहल, सब्सिडी और कार्यक्रमों की खोज करें।',
    'equipment': 'कृषि उपकरण',
    'equipment-description': 'AI-संचालित सिफारिशों के साथ आधुनिक खेती उपकरण और प्रौद्योगिकियों का अन्वेषण करें।',
    'crop-management': 'फसल प्रबंधन',
    'crop-description': 'फसलों, खेती प्रथाओं और बाजार मूल्यों पर विस्तृत जानकारी प्राप्त करें।',
    'ai-assistant': 'AI सहायक',
    'assistant-description': 'प्रश्न पूछें और अपनी खेती की जरूरतों के अनुरूप बुद्धिमान मार्गदर्शन प्राप्त करें।',
    'market-prices': 'लाइव मार्केट प्राइस',
    'prices-description': 'लाभ अधिकतम करने के लिए वास्तविक समय में कृषि वस्तुओं की कीमतों की निगरानी करें।',
    'learn-more': 'और अधिक जानें',
  },
  te: {
    // Home page
    'welcome': 'భవిష్యత్తు స్క్రీన్‌కి స్వాగతం',
    'ai-quote': 'AI రైతును భర్తీ చేయదు - అది వారి సామర్థ్యాన్ని పెంచుతుంది',
    'try-ai-assistant': 'AI సహాయకుడిని ప్రయత్నించండి',
    'explore-schemes': 'పథకాలను అన్వేషించండి',
    // Features section
    'ai-powered-features': 'ఆధునిక వ్యవసాయం కోసం AI-ఆధారిత ఫీచర్లు',
    'agrithirai-leverages': 'AgriThirai రైతులకు శక్తివంతమైన సాధనాలు మరియు అంతర్దృష్టులను అందించడానికి కృత్రిమ మేధస్సును ఉపయోగిస్తుంది.',
    'weather-forecasts': 'వాతావరణ సూచనలు',
    'weather-description': 'వ్యవసాయ అవసరాలకు అనుకూలీకరించబడిన రియల్-టైమ్ వాతావరణ డేటా మరియు సూచనలను యాక్సెస్ చేయండి.',
    'government-schemes': 'ప్రభుత్వ పథకాలు',
    'schemes-description': 'రైతుల కోసం రూపొందించబడిన ప్రభుత్వ చొరవలు, సబ్సిడీలు మరియు కార్యక్రమాలను కనుగొనండి.',
    'equipment': 'వ్యవసాయ పరికరాలు',
    'equipment-description': 'AI-ఆధారిత సిఫార్సులతో ఆధునిక వ్యవసాయ పరికరాలు మరియు సాంకేతికతలను అన్వేషించండి.',
    'crop-management': 'పంట నిర్వహణ',
    'crop-description': 'పంటలు, సాగు పద్ధతులు మరియు మార్కెట్ ధరలపై వివరణాత్మక సమాచారాన్ని పొందండి.',
    'ai-assistant': 'AI సహాయకుడు',
    'assistant-description': 'ప్రశ్నలు అడగండి మరియు మీ వ్యవసాయ అవసరాలకు అనుగుణంగా తెలివైన మార్గదర్శకత్వాన్ని పొందండి.',
    'market-prices': 'ప్రత్యక్ష మార్కెట్ ధరలు',
    'prices-description': 'లాభాలను గరిష్టీకరించడానికి రియల్-టైమ్ వ్యవసాయ వస్తువుల ధరలను పర్యవేక్షించండి.',
    'learn-more': 'మరింత తెలుసుకోండి',
  },
  ml: {
    // Home page
    'welcome': 'ഭാവിയുടെ സ്‌ക്രീനിലേക്ക് സ്വാഗതം',
    'ai-quote': 'AI കർഷകനെ മാറ്റിസ്ഥാപിക്കുന്നില്ല - അത് അവരുടെ കഴിവ് വർദ്ധിപ്പിക്കുന്നു',
    'try-ai-assistant': 'AI അസിസ്റ്റന്റ് പരീക്ഷിക്കുക',
    'explore-schemes': 'പദ്ധതികൾ പര്യവേക്ഷണം ചെയ്യുക',
    // Features section
    'ai-powered-features': 'ആധുനിക കൃഷിക്കായുള്ള AI-പ്രവർത്തിത സവിശേഷതകൾ',
    'agrithirai-leverages': 'AgriThirai കർഷകർക്ക് ശക്തമായ ഉപകരണങ്ങളും ഉൾക്കാഴ്ചകളും നൽകാൻ കൃത്രിമ ബുദ്ധി ഉപയോഗിക്കുന്നു.',
    'weather-forecasts': 'കാലാവസ്ഥാ പ്രവചനങ്ങൾ',
    'weather-description': 'കാർഷിക ആവശ്യങ്ങൾക്കായി തയ്യാറാക്കിയ റിയൽ-ടൈം കാലാവസ്ഥാ ഡാറ്റയും പ്രവചനങ്ങളും ആക്‌സസ് ചെയ്യുക.',
    'government-schemes': 'സർക്കാർ പദ്ധതികൾ',
    'schemes-description': 'കർഷകർക്കായി രൂപകൽപ്പന ചെയ്ത സർക്കാർ സംരംഭങ്ങൾ, സബ്‌സിഡികൾ, പരിപാടികൾ എന്നിവ കണ്ടെത്തുക.',
    'equipment': 'കാർഷിക ഉപകരണങ്ങൾ',
    'equipment-description': 'AI-പ്രവർത്തിത ശുപാർശകളുള്ള ആധുനിക കൃഷി ഉപകരണങ്ങളും സാങ്കേതികവിദ്യകളും പര്യവേക്ഷണം ചെയ്യുക.',
    'crop-management': 'വിള പരിപാലനം',
    'crop-description': 'വിളകൾ, കൃഷി രീതികൾ, വിപണി വിലകൾ എന്നിവയെക്കുറിച്ചുള്ള വിശദമായ വിവരങ്ങൾ നേടുക.',
    'ai-assistant': 'AI അസിസ്റ്റന്റ്',
    'assistant-description': 'ചോദ്യങ്ങൾ ചോദിക്കുകയും നിങ്ങളുടെ കൃഷി ആവശ്യങ്ങൾക്ക് അനുയോജ്യമായ ബുദ്ധിപരമായ മാർഗ്ഗനിർദ്ദേശം സ്വീകരിക്കുകയും ചെയ്യുക.',
    'market-prices': 'തത്സമയ വിപണി വിലകൾ',
    'prices-description': 'ലാഭം പരമാവധി വർദ്ധിപ്പിക്കുന്നതിന് റിയൽ-ടൈം കാർഷിക ഉൽപ്പന്നങ്ങളുടെ വിലകൾ നിരീക്ഷിക്കുക.',
    'learn-more': 'കൂടുതൽ അറിയുക',
  },
  kn: {
    // Home page
    'welcome': 'ಭವಿಷ್ಯದ ಪರದೆಗೆ ಸುಸ್ವಾಗತ',
    'ai-quote': 'AI ರೈತನನ್ನು ಬದಲಾಯಿಸುವುದಿಲ್ಲ - ಅದು ಅವರ ಸಾಮರ್ಥ್ಯವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ',
    'try-ai-assistant': 'AI ಸಹಾಯಕವನ್ನು ಪ್ರಯತ್ನಿಸಿ',
    'explore-schemes': 'ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    // Features section
    'ai-powered-features': 'ಆಧುನಿಕ ಕೃಷಿಗಾಗಿ AI-ಚಾಲಿತ ವೈಶಿಷ್ಟ್ಯಗಳು',
    'agrithirai-leverages': 'AgriThirai ರೈತರಿಗೆ ಶಕ್ತಿಯುತ ಸಾಧನಗಳು ಮತ್ತು ಒಳನೋಟಗಳನ್ನು ಒದಗಿಸಲು ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆಯನ್ನು ಬಳಸುತ್ತದೆ.',
    'weather-forecasts': 'ಹವಾಮಾನ ಮುನ್ಸೂಚನೆಗಳು',
    'weather-description': 'ಕೃಷಿ ಅಗತ್ಯಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ರಿಯಲ್-ಟೈಮ್ ಹವಾಮಾನ ಡೇಟಾ ಮತ್ತು ಮುನ್ಸೂಚನೆಗಳನ್ನು ಪ್ರವೇಶಿಸಿ.',
    'government-schemes': 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
    'schemes-description': 'ರೈತರಿಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಸರ್ಕಾರಿ ಉಪಕ್ರಮಗಳು, ಸಬ್ಸಿಡಿಗಳು ಮತ್ತು ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ.',
    'equipment': 'ಕೃಷಿ ಉಪಕರಣಗಳು',
    'equipment-description': 'AI-ಚಾಲಿತ ಶಿಫಾರಸುಗಳೊಂದಿಗೆ ಆಧುನಿಕ ಕೃಷಿ ಉಪಕರಣಗಳು ಮತ್ತು ತಂತ್ರಜ್ಞಾನಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.',
    'crop-management': 'ಬೆಳೆ ನಿರ್ವಹಣೆ',
    'crop-description': 'ಬೆಳೆಗಳು, ಕೃಷಿ ಅಭ್ಯಾಸಗಳು ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳ ಬಗ್ಗೆ ವಿವರವಾದ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಿರಿ.',
    'ai-assistant': 'AI ಸಹಾಯಕ',
    'assistant-description': 'ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ ಮತ್ತು ನಿಮ್ಮ ಕೃಷಿ ಅಗತ್ಯಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಬುದ್ಧಿವಂತಿಕೆಯ ಮಾರ್ಗದರ್ಶನವನ್ನು ಪಡೆಯಿರಿ.',
    'market-prices': 'ಲೈವ್ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು',
    'prices-description': 'ಲಾಭವನ್ನು ಗರಿಷ್ಠಗೊಳಿಸಲು ರಿಯಲ್-ಟೈಮ್ ಕೃಷಿ ಕಮಾಡಿಟಿ ಬೆಲೆಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ.',
    'learn-more': 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',
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
    return currentTranslations?.[key as keyof typeof currentTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
