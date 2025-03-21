
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Home, Cloud, FileText, Tractor, Leaf, Bot, BarChart3, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

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

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Weather', path: '/weather', icon: Cloud },
    { name: 'Schemes', path: '/schemes', icon: FileText },
    { name: 'Equipment', path: '/equipment', icon: Tractor },
    { name: 'Crops', path: '/crops', icon: Leaf },
    { name: 'AI Assistant', path: '/ai-assistant', icon: Bot },
    { name: 'Live Market Prices', path: '/market-prices', icon: BarChart3 },
  ];

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
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'nav-link flex items-center space-x-1 text-sm font-medium transition-colors',
                isActive(link.path)
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              )}
            >
              <link.icon className="h-4 w-4" />
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
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
              <span>Login</span>
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
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                  isActive(link.path)
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-primary/5 text-foreground'
                )}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
