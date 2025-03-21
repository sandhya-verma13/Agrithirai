
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="h-8 w-8 bg-gradient-to-br from-agri-green-500 to-agri-green-700 rounded-md flex items-center justify-center text-white font-bold">
                A
              </span>
              <span className="font-display font-bold text-xl tracking-tight">
                Agri<span className="text-primary">Thirai</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Revolutionizing agriculture with AI-powered insights, helping farmers increase productivity and profitability while promoting sustainable farming practices.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/weather" className="text-muted-foreground hover:text-primary transition-colors">
                  Weather
                </Link>
              </li>
              <li>
                <Link to="/schemes" className="text-muted-foreground hover:text-primary transition-colors">
                  Schemes
                </Link>
              </li>
              <li>
                <Link to="/equipment" className="text-muted-foreground hover:text-primary transition-colors">
                  Equipment
                </Link>
              </li>
              <li>
                <Link to="/crops" className="text-muted-foreground hover:text-primary transition-colors">
                  Crops
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/ai-assistant" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link to="/market-prices" className="text-muted-foreground hover:text-primary transition-colors">
                  Market Prices
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} AgriThirai. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Facebook
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Twitter
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
