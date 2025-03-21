
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Home, Bot, LogIn, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from '@/contexts/LanguageContext';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

// Add the appropriate icon imports
import { Cloud, FileText, Tractor, Leaf, BarChart3 } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const checkDarkMode = () => {
      if (typeof window !== 'undefined') {
        setIsDark(document.documentElement.classList.contains('dark'));
      }
    };

    window.addEventListener('scroll', handleScroll);
    checkDarkMode();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location.pathname]);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const isActive = (path: string) => location.pathname === path;

  // Features dropdown options
  const features = [
    { name: language === 'en' ? 'Weather' : t('weather-forecasts'), path: '/weather', icon: Cloud },
    { name: language === 'en' ? 'Schemes' : t('government-schemes'), path: '/schemes', icon: FileText },
    { name: language === 'en' ? 'Equipment' : t('equipment'), path: '/equipment', icon: Tractor },
    { name: language === 'en' ? 'Crops' : t('crop-management'), path: '/crops', icon: Leaf },
    { name: language === 'en' ? 'Live Market Prices' : t('market-prices'), path: '/market-prices', icon: BarChart3 },
  ];

  // Language options
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
  ];

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 animate-navbar-in py-4 px-4 md:px-6',
        scrolled
          ? 'bg-background/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 group"
        >
          <span className="h-8 w-8 bg-gradient-to-br from-agri-green-500 to-agri-green-700 rounded-md flex items-center justify-center text-white font-bold">
            A
          </span>
          <span className="font-display font-bold text-xl tracking-tight">
            Agri<span className="text-primary">Thirai</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Home className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Home' : t('home')}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                {language === 'en' ? 'Features' : t('features')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {features.map((feature) => (
                    <li key={feature.path} className="row-span-1">
                      <Link to={feature.path} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="flex items-center space-x-2">
                          <feature.icon className="h-4 w-4" />
                          <div className="text-sm font-medium leading-none">{feature.name}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/ai-assistant">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Bot className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'AI Assistant' : t('ai-assistant')}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="transition-transform hover:scale-110"
                aria-label="Change language"
              >
                <Globe className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Select Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={language} onValueChange={handleLanguageChange}>
                {languages.map((lang) => (
                  <DropdownMenuRadioItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="transition-transform hover:scale-110"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>

          <Link to="/login">
            <Button 
              variant="default" 
              size="sm"
              className="flex items-center space-x-2 bg-gradient-to-r from-primary to-agri-green-600 hover:from-agri-green-600 hover:to-primary transition-all duration-300"
            >
              <LogIn className="h-4 w-4" />
              <span>{language === 'en' ? 'Login' : t('login')}</span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden px-4 py-6 mt-2 bg-background/95 backdrop-blur-md rounded-xl border border-border animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                isActive('/')
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-primary/5 text-foreground'
              )}
            >
              <Home className="h-5 w-5" />
              <span>{language === 'en' ? 'Home' : t('home')}</span>
            </Link>
            
            <div className="px-4 py-2">
              <div className="font-medium mb-2">{language === 'en' ? 'Features' : t('features')}</div>
              <div className="pl-4 space-y-2">
                {features.map((feature) => (
                  <Link
                    key={feature.path}
                    to={feature.path}
                    className={cn(
                      'flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors',
                      isActive(feature.path)
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-primary/5 text-foreground'
                    )}
                  >
                    <feature.icon className="h-4 w-4" />
                    <span>{feature.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            
            <Link
              to="/ai-assistant"
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                isActive('/ai-assistant')
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-primary/5 text-foreground'
              )}
            >
              <Bot className="h-5 w-5" />
              <span>{language === 'en' ? 'AI Assistant' : t('ai-assistant')}</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
